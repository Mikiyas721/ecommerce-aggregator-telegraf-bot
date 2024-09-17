export const dependencyKeys = {
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
    botToScenesKeyboard: "botToScenesKeyboard",
    //inlineKeyboards
    /**
     * ------------------------- User Module --------------------------
     * */
    //Datasource
    userDatasource: "userDatasource",
    feedbackDatasource: "feedbackDatasource",
    productDatasource: "productDatasource",
    invitationDatasource: "invitationDatasource",
    walletDatasource: "walletDatasource",
    //Repo
    userRepo: "userRepo",
    feedbackRepo: "feedbackRepo",
    productRepo: "productRepo",
    invitationRepo: "invitationRepo",
    walletRepo: "walletRepo",
    //Use
    fetchUserByTelegramId: "fetchUserByTelegramId",
    fetchUserByPhone: "fetchUserByPhone",
    registerUser: "registerUser",
    updateUserTelegramId: "updateUserTelegramId",
    addFeedback: "addFeedback",
    fetchBundleOrProduct: "fetchBundleOrProduct",
    createInvitation: "createInvitation",
    fetchMyWallet: "fetchMyWallet",
    withdrawReward: "withdrawReward",
    //scenes
    userRegistrationScene: "userRegistrationScene",
    feedbackScene: "feedbackScene",
    myWalletScene: "myWalletScene",
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
    walletWithdrawInlineKeyboard: "walletWithdrawInlineKeyboard",
    walletBackInlineKeyboard: "walletBackInlineKeyboard",
    withdrawWithTopUpInlineKeyboard: "withdrawWithTopUpInlineKeyboard",
    withdrawWithTopUpBackInlineKeyboard: "withdrawWithTopUpBackInlineKeyboard",
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
    mainMenu: "mainMenu",
    myWallet: "myWallet"
}
