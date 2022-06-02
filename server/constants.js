const USER_ROLE = [
    'Client',
    'Admin'
];

const PlANO_HISTORY_TYPE = [
    'Refill',
    'pull',
    'Buy'
]

const STATUS_ACTIVE = 'Active'; 
const STATUS_DEACTIVE = 'Inactive'; 

const RELEASE_TYPE = [
    'Spiral',
    'Conveyor',
    'Claw',
    'Other'
]

const LENGTH_UNIT = [
    'cms', 'mms'
];

const WEIGHT_UNIT = [
    'gms', 'kgs'
];

const PRICE_UNIT = [
    'AUD$', 'USD$'
];

const YES = 'Yes'; 
const NO = 'No'; 

const IMAGE_UPLOAD_URL = '/uploads/images/';
// const LOG_FILE_PATH = "D:/Workspace/0514_vending_portal_Australia/vgc2_backup/";
const LOG_FILE_PATH = "/home/vending/vgc2_backup/";
const PYTHON_PATH = "/home/vending/python";
const APP_PATH = "/home/TCN_Portal";
// const PYTHON_PATH = "D:/Workspace/0514_vending_portal_Australia/test";

module.exports = { 
    STATUS_ACTIVE,
    STATUS_DEACTIVE,
    RELEASE_TYPE,
    YES,
    NO,
    IMAGE_UPLOAD_URL,
    LENGTH_UNIT,
    WEIGHT_UNIT,
    PRICE_UNIT,
    LOG_FILE_PATH,
    PYTHON_PATH,
    USER_ROLE,
    APP_PATH,
    PlANO_HISTORY_TYPE,
};
