import I18n from "telegraf-i18n";
import path from "path";
import {provider} from "telegraf-721";
import {dependencyKeys} from "../../common/utils/constants";

export type Translator = I18n

export const injectTranslator = () => {
    provider.registerSingleton(dependencyKeys.translator, new I18n({
        directory: path.join(process.cwd(), '/assets/locales'),
        defaultLanguage: 'en',
        sessionName: 'session',
        useSession: true,
        allowMissing: true,
        defaultLanguageOnMissing: true,
    }))
}
