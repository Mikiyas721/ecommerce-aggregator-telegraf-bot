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
    postScene: "postScene",
    //commands
    postCommand: "postCommand",
    //keyboards
    sharePhoneNumberKeyboard: "sharePhoneNumberKeyboard",
    skipUserRegistrationKeyboard: "skipUserRegistrationKeyboard",
    cancelPostKeyboard: "cancelPostKeyboard",
    //inlineKeyboards
    confirmPostInlineKeyboard: "confirmPostInlineKeyboard",
    cancelPostInlineKeyboard: "cancelPostInlineKeyboard"
}

export const sceneKeys = {
    userRegistration: "userRegistration",
    post: "post",
}

export const CALLBACK_DATA_SEPARATOR = "|"
export const CALLBACK_DATA_SEPARATOR_2 = "&"

export const getRegExpEquivalent = (separator: string) => {
    if ("|") return "\\|"
    if ("&") return "\\&"
    return separator
}
