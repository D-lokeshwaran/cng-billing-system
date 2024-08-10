package com.cng_billing_system.core_api.listener;

import org.hibernate.event.spi.*;

public interface PostEventListener extends
        PostInsertEventListener,
        PostUpdateEventListener,
        PostDeleteEventListener,
        PostCollectionUpdateEventListener
{
}
