import {CALLBACK_DATA_SEPARATOR, dependencyKeys, getRegExpEquivalent} from "../constants";
import {TelegrafContext} from "../telegraf_types/context_types";
import {provider} from "../../../injection";
import {Translator} from "../../../modules/localization/translator";

export abstract class MyInlineKeyboard {
    protected constructor(
        protected localizationKey: string,
        protected translated: boolean
    ) {
    }

    get getLocalizationKey(): string {
        if (!this.localizationKey) throw Error("Label is missing")
        return this.localizationKey
    }

    get isTranslated(): boolean {
        return this.translated
    }
}

export class MyUrlInlineKeyboard extends MyInlineKeyboard {
    constructor(
        localizationKey: string,
        protected url: string,
        translated: boolean = false
    ) {
        super(localizationKey, translated);
    }

    get getUrl(): string {
        return this.url
    }
}

export class MyWebAppInlineKeyboard extends MyInlineKeyboard {
    constructor(
        localizationKey: string,
        protected url: string,
        translated: boolean = false
    ) {
        super(localizationKey, translated);
    }

    get getUrl(): string {
        return this.url
    }
}

export abstract class MyCallbackInlineKeyboard extends MyInlineKeyboard {
    protected constructor(
        localizationKey: string,
        readonly handler: (ctx: TelegrafContext) => any,
        translated: boolean = false
    ) {
        super(localizationKey, translated);
    }

    abstract get key(): RegExp | string

    abstract get callbackData(): string

    abstract get logLabel(): string
}


export class MyCoreCallbackInlineKeyboard extends MyCallbackInlineKeyboard {
    constructor(
        localizationKey: string,
        private coreCallback: string,
        handler: (ctx: TelegrafContext) => any,
        public dataPattern?: string | undefined,
        public data?: string | undefined,
        translated: boolean = false
    ) {
        super(localizationKey, handler, translated)
    }

    get key(): RegExp | string {
        return this.dataPattern ?
            new RegExp(`^${this.coreCallback}${getRegExpEquivalent(CALLBACK_DATA_SEPARATOR)}${this.dataPattern}$`) :
            this.coreCallback
    }

    get callbackData(): string {
        return this.data ?
            `${this.coreCallback}${CALLBACK_DATA_SEPARATOR}${this.data}` :
            this.coreCallback
    }

    mutateAndGet(changes: {
        data?: string,
        localizationKey?: string,
        translated?: boolean,
        createNewInstance?: boolean
    }): MyCoreCallbackInlineKeyboard {
        if (changes.createNewInstance ?? false) {
            return new MyCoreCallbackInlineKeyboard(
                changes.localizationKey ?? this.localizationKey,
                this.coreCallback,
                this.handler,
                this.dataPattern,
                changes.data ?? this.data,
                changes.translated == undefined ? this.translated : changes.translated
            )
        } else {
            this.localizationKey = changes.localizationKey ?? this.localizationKey
            this.data = changes.data
            this.translated = changes.translated == undefined ? this.translated : changes.translated
            return this
        }
    }

    get logLabel(): string {
        const translator = provider.get<Translator>(dependencyKeys.translator)
        return translator.t("en", this.getLocalizationKey);
    }
}

//DONT USE
//Only created to accommodate old implementation
export class MyCoreCallbackTempInlineKeyboard extends MyCoreCallbackInlineKeyboard {
    constructor(
        coreCallback: string,
        handler: (ctx: TelegrafContext) => any,
        private keyRegExp: string
    ) {
        super("NOT DEFINED", coreCallback, handler);
    }

    get key(): RegExp | string {
        return new RegExp(`^${this.keyRegExp}$`)
    }
}

export class MyDataPatternInlineKeyboard extends MyCallbackInlineKeyboard {
    constructor(
        localizationKey: string,
        private dataPattern: string,
        handler: (ctx: TelegrafContext) => any,
    ) {
        super(localizationKey, handler)
    }

    get key(): RegExp | string {
        return new RegExp(`^${this.dataPattern}$`)
    }

    get callbackData(): string {
        return this.dataPattern
    }

    get logLabel(): string {
        const translator = provider.get<Translator>(dependencyKeys.translator)
        return translator.t("en", this.getLocalizationKey);
    }
}
