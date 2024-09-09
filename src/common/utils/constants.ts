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
    invitationDatasource: "invitationDatasource",
    //Repo
    userRepo: "userRepo",
    feedbackRepo: "feedbackRepo",
    productRepo: "productRepo",
    invitationRepo: "invitationRepo",
    //Use
    fetchUserByTelegramId: "fetchUserByTelegramId",
    fetchUserByPhone: "fetchUserByPhone",
    registerUser: "registerUser",
    updateUserTelegramId: "updateUserTelegramId",
    addFeedback: "addFeedback",
    fetchBundleOrProduct: "fetchBundleOrProduct",
    createInvitation: "createInvitation",
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
    /**
     * ------------------------ Main Menu Module ------------------------
     * */
    //scenes
    mainMenuScene: "mainMenuScene",
    //keyboards
    inviteKeyboard: "inviteKeyboard",
    myWalletKeyboard: "myWalletKeyboard",
    myOrdersKeyboard: "myOrdersKeyboard"
}

export const sceneKeys = {
    userRegistration: "userRegistration",
    feedback: "feedback",
    order: "order",
    mainMenu: "mainMenu"
}

export const CALLBACK_DATA_SEPARATOR = "|"
export const CALLBACK_DATA_SEPARATOR_2 = "&"

export const getRegExpEquivalent = (separator: string) => {
    if ("|") return "\\|"
    if ("&") return "\\&"
    return separator
}
