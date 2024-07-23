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
    feedbackCommand: "feedbackCommand",
    //keyboards
    startShoppingKeyboard: "startShoppingKeyboard",
    //inlineKeyboards
    /**
     * ------------------------- User Module --------------------------
     * */
    //Datasource
    userDatasource: "userDatasource",
    feedbackDatasource: "feedbackDatasource",
    productDatasource: "productDatasource",
    //Repo
    userRepo: "userRepo",
    feedbackRepo: "feedbackRepo",
    productRepo: "productRepo",
    //Use
    fetchUserByTelegramId: "fetchUserByTelegramId",
    fetchUserByPhone: "fetchUserByPhone",
    registerUser: "registerUser",
    updateUserTelegramId: "updateUserTelegramId",
    addFeedback: "addFeedback",
    fetchBundleOrProduct: "fetchBundleOrProduct",
    //scenes
    userRegistrationScene: "userRegistrationScene",
    feedbackScene: "feedbackScene",
    //commands
    //keyboards
    sharePhoneNumberKeyboard: "sharePhoneNumberKeyboard",
    cancelPostKeyboard: "cancelPostKeyboard",
    cancelFeedbackKeyboard: "cancelFeedbackKeyboard",
    //inlineKeyboards
    confirmPostInlineKeyboard: "confirmPostInlineKeyboard",
    cancelPostInlineKeyboard: "cancelPostInlineKeyboard",
    confirmFeedbackInlineKeyboard: "confirmFeedbackInlineKeyboard",
    cancelFeedbackInlineKeyboard: "cancelFeedbackInlineKeyboard",
    editFeedbackInlineKeyboard: "editFeedbackInlineKeyboard",
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
    feedback: "feedback",
    order: "order"
}

export const CALLBACK_DATA_SEPARATOR = "|"
export const CALLBACK_DATA_SEPARATOR_2 = "&"

export const getRegExpEquivalent = (separator: string) => {
    if ("|") return "\\|"
    if ("&") return "\\&"
    return separator
}
