angular.module('knowDebugApp').constant('appData', {

    COLUMN_VALUE_FILTER: [
        'All',
        'Valid',
        'Invalid',
        'Missing'
    ],
    FILTER_TYPE_LABELS: {
        FILTER_TYPE_LABEL_DEVICE: "Device Types",
        FILTER_TYPE_LABEL_ATTRS: "Attributes",
        FILTER_TYPE_LABEL_GLOBALATTRS: "Global Attributes",
        FILTER_TYPE_LABEL_METRICS: "Metrics",
        FILTER_TYPE_LABEL_TEXT_FILTERS: "Text Filters",
        FILTER_TYPE_LABEL_EVENTTYPES: "Event Types"
    },
    COLUMN_LABELS: {
        COLUMN_LABEL_MODE: "Mode",
        COLUMN_LABEL_STATUS: "Status",
        COLUMN_LABEL_REQUEST: "Request",
        COLUMN_LABEL_DATE: "Date",
        COLUMN_LABEL_IPADDR: "IP Address",
        COLUMN_LABEL_RESPTIME: "Response Time",
        COLUMN_LABEL_RESPMSG: "Response Message",
        COLUMN_LABEL_AUTH: "Auth",
        COLUMN_LABEL_USER: "User"
    },
    FILTERS_EVENT_TYPE: [
        "_app.launch"
    ],
    FILTERS_DEVICE_TYPE: [
        "web",
        "ios",
        "android"
    ],
    FILTERS_ATTRS: [
        "monetization_transaction_price_amount"
    ],
    FILTERS_GLOBAL_ATTRS: [
        "app_env"
    ],
    FILTERS_METRICS: [
        "stop_time"
    ],
    FILTERS_EVENT_ACTION: [
        "error"
    ],
    DEFAULT_ATTRS_BY_EVENT_TYPES: {
        "_content.view": [
            "content_id"
        ],
        "_content.favourite": [
            "event_action"
        ],
        "_content.recently-watched": [
            "event_action"           
        ],
        "_content.playback": [
            "event_action"
        ],
        "_content.download": [
            "event_action"
        ],
        "_content.share": [               
            "content_id"
        ],
        "_user.logout": [
            "device_ismobile"
        ],
        "_app.launch":[
            "app_isfirsttime"
        ], 
        "_page.view":[
            "page_url",
            "page_title"
        ],
        "_section.view":[
            "page_url",
            "page_title",
            "section_id",
            "section_title"
        ],
        "_user.signup":[
            "user_id",
            "user_email",
            "user_dob",
            "user_gender"
        ],
        "_user.login":[
            "user_id",
            "user_name",
            "user_email",
            "event_mode"
        ],
        "_user.logout":[
            "user_id"
        ],
        "_user.update_profile":[
            "user_id",
            "user_email",
            "user_dob",
            "user_gender"
        ], 
        "_user.change_password":[
            "user_id"
        ],
        "_user.reset_password":[
            "user_id"
        ],
        "_search.results":[
            "search_text"
        ],
        "_menu.select":[
            "page_title",
            "section_title",
            "section_id"
        ],
        "_category.select":[
            "category_title",
            "category_id",
            "category_url"
        ],
        "_product.checkout":[
            "product_id",
            "product_type",
            "product_title",
            "product_currency",
            "order_id", 
            "content_title"
        ],
        "_product.renew":[
            "product_id",
            "product_type",
            "product_title",
            "product_currency",
            "order_id", 
            "original_order_id",
            "original_transaction_id",
            "content_title"
        ],
        "_monetization.purchase":[
            "product_id",
            "product_type",
            "product_title",
            "product_currency",
            "order_id",
            "event_mode",
            "cc_type",
            "bank_name",
            "monetization_transaction_id",
            "monetization_transaction_store",
            "monetization_transaction_quantity",
            "monetization_transaction_item_id",
            "monetization_transaction_price_reported",
            "monetization_transaction_price_amount",
            "monetization_transaction_price_currency_code",
            "monetization_transaction_price_currency_symbol",
            "promo_code"
        ],
        "_monetization.failure":[
            "promo_code"
        ],
        "_notification.select":[
            "notification_id",
            "notification_type",
            "content_id"
        ],
        "_network.connection":[
            "event_action"
        ], 
        "_chromecast.connection":[
            "device_name"
        ],
        "_content.subtitles":[
            "event_action"
        ]

    },
    DEFAULT_GLOBAL_ATTRS_BY_DEVICE_TYPES: {
        "web": [
            "app_env"
        ],
        "ios": [
            "app_env"
        ],
        "android": [
            "app_env"
        ]
    }
});
