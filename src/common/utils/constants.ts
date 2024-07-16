export const dependencyKeys = {
    translator: "translator",
    config: "config",
    mainStage: "mainStage",
    restDatasource: "restDatasource",
    /**
     * ------------------------- Common Module --------------------------
     * */
    //Datasource
    //Repo
    //Use
    //scenes
    //commands
    startCommand: "startCommand",
    //keyboards
    startShoppingKeyboard: "startShoppingKeyboard",
    mainMenuPreviousKeyboards: "mainMenuPreviousKeyboards",
    //inlineKeyboards
    /**
     * ------------------------- User Module --------------------------
     * */
    //Datasource
    userDatasource: "userDatasource",
    productDatasource: "productDatasource",
    //Repo
    userRepo: "userRepo",
    productRepo: "productRepo",
    //Use
    fetchUserByTelegramId: "fetchUserByTelegramId",
    fetchUserByPhone: "fetchUserByPhone",
    registerUser: "registerUser",
    updateUserTelegramId: "updateUserTelegramId",
    fetchBundleOrProduct: "fetchBundleOrProduct",
    //scenes
    userRegistrationScene: "userRegistrationScene",
    //commands
    postCommand: "postCommand",
    //keyboards
    sharePhoneNumberKeyboard: "sharePhoneNumberKeyboard",
    skipUserRegistrationKeyboard: "skipUserRegistrationKeyboard",
    cancelPostKeyboard: "cancelPostKeyboard",
    //inlineKeyboards
    confirmPostInlineKeyboard: "confirmPostInlineKeyboard",
    cancelPostInlineKeyboard: "cancelPostInlineKeyboard",
    /**
     * ------------------------- Order Module --------------------------
     * */
    //Datasource
    orderDatasource: "orderDatasource",
    orderRepo: "orderRepo",
    //Repo
    //Use
    placeOrder: "placeOrder",
    //scenes
    orderScene: "orderScene",
    //commands
    //keyboards
    skipOrderFieldKeyboard: "skipOrderFieldKeyboard",
    cancelOrderKeyboard: "cancelOrderKeyboard",
    //inlineKeyboards
}

export const sceneKeys = {
    userRegistration: "userRegistration",
    order: "order"
}

export const CALLBACK_DATA_SEPARATOR = "|"
export const CALLBACK_DATA_SEPARATOR_2 = "&"

export const getRegExpEquivalent = (separator: string) => {
    if ("|") return "\\|"
    if ("&") return "\\&"
    return separator
}
