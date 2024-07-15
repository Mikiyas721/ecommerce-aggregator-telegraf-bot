import {provider} from "../../../injection";
import {Translator} from "../../../modules/localization/translator";
import {TelegrafContext} from "../telegraf_types/context_types";
import {dependencyKeys} from "../constants";

export abstract class MyKeyboard {
    protected constructor(readonly localizationKey: string) {
    }
}

export abstract class HandledKeyboard extends MyKeyboard {
    protected constructor(
        localizationKey: string,
        readonly handler: (ctx: TelegrafContext) => any
    ) {
        super(localizationKey);
    }

    abstract get key(): string[] | RegExp

    abstract get logLabel(): string
}

export class MyLabelPatternKeyboard extends HandledKeyboard {
    constructor(
        readonly labelPattern: string,
        handler: (ctx: TelegrafContext) => any,
        localizationLabel: string = "NOT DEFINED"
    ) {
        super(localizationLabel, handler)
    }

    get key(): RegExp {
        return new RegExp(`^${this.labelPattern}$`)
    }

    get logLabel(): string {
        return `RegExp${new RegExp(`^${this.labelPattern}`)}`
    }

    mutateAndGet(changes: {
        label: string
    }): MyLabelPatternKeyboard {
        if (!this.key.test(changes.label))
            throw Error(`${changes.label} does not satisfy pattern ${this.labelPattern}`)
        return new MyLabelPatternKeyboard(
            this.labelPattern,
            this.handler,
            changes.label ?? this.localizationKey
        )
    }
}

export class MyLabelKeyboard extends HandledKeyboard {
    constructor(
        localizationKey: string,
        handler: (ctx: TelegrafContext) => any
    ) {
        super(localizationKey, handler)
    }

    get key(): string[] | RegExp {
        return this.getButtonKeys(this.localizationKey)
    }

    get logLabel(): string {
        const translator = provider.get<Translator>(dependencyKeys.translator)
        return translator.t("en", this.localizationKey);
    }

    private getButtonKeys(resourceKey: string) {
        const translator = provider.get<Translator>(dependencyKeys.translator)
        return translator.availableLocales().map((langCode) =>
            translator.t(langCode, resourceKey)
        )
    }
}

export class MyLabeledOnlyKeyboard extends MyKeyboard {
    constructor(
        label: string
    ) {
        super(label);
    }
}

export class MyExtraFunctionKeyboard extends MyKeyboard {
    constructor(
        readonly localizationKey: string,
        readonly config: {
            requestContact?: boolean,
            requestLocation?: boolean
        }
    ) {
        super(localizationKey);
        if (config.requestContact && config.requestLocation) {
            throw new Error("MyExtraFunctionKeyboard needs to be configured with one of the extra functions")
        }
    }
}
