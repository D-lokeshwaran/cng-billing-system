package com.cng_billing_system.core_api.listener;

import com.cng_billing_system.core_api.activityLog.ActivityLog;
import com.cng_billing_system.core_api.activityLog.ActivityLogRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import org.hibernate.collection.spi.PersistentCollection;
import org.hibernate.engine.spi.CollectionEntry;
import org.hibernate.engine.spi.PersistenceContext;
import org.hibernate.event.spi.*;
import org.hibernate.persister.entity.EntityPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.*;

@Component
public class CustomPostEventListener implements PostEventListener {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void onPostInsert(PostInsertEvent event) {
        Object entity = event.getEntity();
        Class<?> entityClass = event.getEntity().getClass();
        if (entityClass.equals(ActivityLog.class)) {
            return;
        }
        String entityName = event.getEntity().getClass().getSimpleName();
        ActivityLog activityLog = new ActivityLog("Created", entityName);
        setEntityReferKey(entity, entityClass, activityLog);
        activityLogRepository.save(activityLog);
    }

    @Override
    public void onPostUpdate(PostUpdateEvent event) {
        int[] dirtyProperties = event.getDirtyProperties();
        Object entity = event.getEntity();
        Class<?> entityClass = event.getEntity().getClass();
        String entityName = entityClass.getSimpleName();
        ActivityLog activityLog = new ActivityLog("Updated", entityName);
        Object[] state = event.getState();

        // update dirty field (fields which changes) to activity log
        if (dirtyProperties.length > 0) {
            StringBuilder changes = new StringBuilder();
            Object[] oldState = event.getOldState();
            try {
                Field[] declaredFields = entityClass.getDeclaredFields();
                for (int dirtyPropertyIndex : dirtyProperties) {
                    Field dirtyField = declaredFields[dirtyPropertyIndex];
                    dirtyField.setAccessible(true);
                    String dirtyFieldName = event.getPersister().getAttributeMapping(dirtyPropertyIndex).getAttributeName();
                    if (oldState[dirtyPropertyIndex] != null) {
                        Object oldValue = oldState[dirtyPropertyIndex];
                        Object newValue = state[dirtyPropertyIndex];
                        if (changes.length() > 0) {
                            changes.append(", ");
                        }
                        changes.append(dirtyFieldName + " of " + entityName + ": " + oldValue + " => " + newValue);
                    } else if (dirtyProperties.length == 1) {
                        return; // skip reference entity update log
                    }
                }
                if (changes.length() > 0) {
                    activityLog.setChanges(changes.toString());
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        setEntityReferKey(entity, entityClass, activityLog);
        activityLogRepository.save(activityLog);
    }

    @Override
    public void onPostUpdateCollection(PostCollectionUpdateEvent event) {
        PersistentCollection<?> pc = event.getCollection();
        PersistenceContext context = event.getSession().getPersistenceContext();
        CollectionEntry entry = context.getCollectionEntry( pc );
        Object snapshot = entry.getSnapshot();
        Object oldSnapshot = pc.getStoredSnapshot();
        StringBuilder changes = new StringBuilder();
        Object entity = event.getAffectedOwnerOrNull();
        ActivityLog activityLog = new ActivityLog("Updated", entity.getClass().getSimpleName());

        if ( snapshot == null ) return;
        try {
            List state = Collections.unmodifiableList((List) snapshot);
            List oldState = Collections.unmodifiableList((List) oldSnapshot);
            Class<?> collectionClass = state.get(0).getClass();
            Field[] collectionClassFields = collectionClass.getDeclaredFields();
            Map<Integer, Object> rowChanges = new LinkedHashMap<>();

            for (int row = 0; row < state.size(); row++) {
                Map<String, Object> rowChange = new LinkedHashMap<>();
                for (Field field : collectionClassFields) {
                    field.setAccessible(true);
                    Object oldValue = field.get(oldState.get(row));
                    Object newValue = field.get(state.get(row));
                    if (!oldValue.equals(newValue)) {
                        if (changes.length() > 0) changes.append(", ");
                        changes.append(field.getName() + " of " + (row + 1) + " of " +
                                collectionClass.getSimpleName() + ": " + oldValue + "=> " + newValue);
                    }
                }
                if (changes.length() > 0)
                    rowChanges.put(row, rowChange);
            }
            activityLog.setChanges(changes.toString());
        } catch (IllegalAccessException iex) {
            iex.printStackTrace();
        }
        setEntityReferKey(entity, entity.getClass(), activityLog);
        activityLogRepository.save(activityLog);
    }

    @Override
    public void onPostDelete(PostDeleteEvent event) {
        Object entity = event.getEntity();
        Class<?> entityClass = event.getEntity().getClass();
        if (entityClass.equals(ActivityLog.class)) {
            return;
        }
        String entityName = event.getEntity().getClass().getSimpleName();
        ActivityLog activityLog = new ActivityLog("Deleted", entityName);
        setEntityReferKey(entity, entityClass, activityLog);
        activityLogRepository.save(activityLog);
    }

    @Override
    public boolean requiresPostCommitHandling(EntityPersister persister) {
        return true;
    }

    public void setEntityReferKey(Object entity, Class<?> parentClass, ActivityLog activityLog) {
        Map<String, Object> referKeys = new LinkedHashMap<>();
        try {
            Object parentIdentifierValue = getIdentifierValue(entity, parentClass.getDeclaredFields());
            referKeys.put(parentClass.getSimpleName(), parentIdentifierValue);
            activityLog.setReferKeys(mapper.writeValueAsString(referKeys));
        } catch (IllegalAccessException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private Object getIdentifierValue(Object entity, Field[] entityFields) throws IllegalAccessException {
        Optional<Field> optionalIdentifierField = Arrays.stream(entityFields)
                .filter(field -> field.isAnnotationPresent(Id.class))
                .findFirst();
        if (optionalIdentifierField.isPresent()) {
            Field identifierField = optionalIdentifierField.get();
            identifierField.setAccessible(true);
            return identifierField.get(entity);
        }
        return null;
    }
}