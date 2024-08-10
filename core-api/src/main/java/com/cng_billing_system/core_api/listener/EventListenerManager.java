package com.cng_billing_system.core_api.listener;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.hibernate.event.service.spi.EventListenerRegistry;
import org.hibernate.event.spi.EventType;
import org.hibernate.internal.SessionFactoryImpl;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class EventListenerManager {

    private final EntityManagerFactory entityManagerFactory;

    private final PostEventListener postEventListener;

    @PostConstruct
    private void registerEventListener() {
        SessionFactoryImpl sessionFactory = entityManagerFactory.unwrap(SessionFactoryImpl.class);
        EventListenerRegistry registry = sessionFactory.getServiceRegistry().getService(EventListenerRegistry.class);
        if (registry != null) {
            registry.getEventListenerGroup(EventType.POST_INSERT).appendListener(postEventListener);
            registry.getEventListenerGroup(EventType.POST_UPDATE).appendListener(postEventListener);
            registry.getEventListenerGroup(EventType.POST_COLLECTION_UPDATE).appendListener(postEventListener);
            registry.getEventListenerGroup(EventType.POST_DELETE).appendListener(postEventListener);
        }
    }
}