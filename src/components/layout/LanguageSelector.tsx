import { useEffect, useState } from 'react'
import { FiCheck, FiGlobe } from 'react-icons/fi'

type Language = {
  code: string
  label: string
  nativeLabel: string
}

type GoogleTranslateApi = {
  translate: {
    TranslateElement: new (
      options: { pageLanguage: string; includedLanguages?: string; autoDisplay: boolean },
      elementId: string,
    ) => unknown
  }
}

const languages: Language[] = [
  ['af', 'Afrikaans'], ['sq', 'Albanian'], ['am', 'Amharic'], ['ar', 'Arabic'], ['hy', 'Armenian'], ['as', 'Assamese'], ['ay', 'Aymara'], ['az', 'Azerbaijani'], ['bm', 'Bambara'], ['eu', 'Basque'], ['be', 'Belarusian'], ['bn', 'Bengali'], ['bho', 'Bhojpuri'], ['bs', 'Bosnian'], ['bg', 'Bulgarian'], ['ca', 'Catalan'], ['ceb', 'Cebuano'], ['ny', 'Chichewa'], ['zh-CN', 'Chinese (Simplified)'], ['zh-TW', 'Chinese (Traditional)'], ['co', 'Corsican'], ['hr', 'Croatian'], ['cs', 'Czech'], ['da', 'Danish'], ['dv', 'Dhivehi'], ['doi', 'Dogri'], ['nl', 'Dutch'], ['en', 'English'], ['eo', 'Esperanto'], ['et', 'Estonian'], ['ee', 'Ewe'], ['tl', 'Filipino'], ['fi', 'Finnish'], ['fr', 'French'], ['fy', 'Frisian'], ['gl', 'Galician'], ['ka', 'Georgian'], ['de', 'German'], ['el', 'Greek'], ['gn', 'Guarani'], ['gu', 'Gujarati'], ['ht', 'Haitian Creole'], ['ha', 'Hausa'], ['haw', 'Hawaiian'], ['he', 'Hebrew'], ['hi', 'Hindi'], ['hmn', 'Hmong'], ['hu', 'Hungarian'], ['is', 'Icelandic'], ['ig', 'Igbo'], ['ilo', 'Ilocano'], ['id', 'Indonesian'], ['ga', 'Irish'], ['it', 'Italian'], ['ja', 'Japanese'], ['jv', 'Javanese'], ['kn', 'Kannada'], ['kk', 'Kazakh'], ['km', 'Khmer'], ['rw', 'Kinyarwanda'], ['gom', 'Konkani'], ['ko', 'Korean'], ['kri', 'Krio'], ['ku', 'Kurdish (Kurmanji)'], ['ckb', 'Kurdish (Sorani)'], ['ky', 'Kyrgyz'], ['lo', 'Lao'], ['la', 'Latin'], ['lv', 'Latvian'], ['ln', 'Lingala'], ['lt', 'Lithuanian'], ['lg', 'Luganda'], ['lb', 'Luxembourgish'], ['mk', 'Macedonian'], ['mai', 'Maithili'], ['mg', 'Malagasy'], ['ms', 'Malay'], ['ml', 'Malayalam'], ['mt', 'Maltese'], ['mi', 'Maori'], ['mr', 'Marathi'], ['mni-Mtei', 'Meiteilon (Manipuri)'], ['lus', 'Mizo'], ['mn', 'Mongolian'], ['my', 'Myanmar (Burmese)'], ['ne', 'Nepali'], ['no', 'Norwegian'], ['or', 'Odia (Oriya)'], ['om', 'Oromo'], ['ps', 'Pashto'], ['fa', 'Persian'], ['pl', 'Polish'], ['pt', 'Portuguese'], ['pa', 'Punjabi'], ['qu', 'Quechua'], ['ro', 'Romanian'], ['ru', 'Russian'], ['sm', 'Samoan'], ['sa', 'Sanskrit'], ['gd', 'Scots Gaelic'], ['nso', 'Sepedi'], ['sr', 'Serbian'], ['st', 'Sesotho'], ['sn', 'Shona'], ['sd', 'Sindhi'], ['si', 'Sinhala'], ['sk', 'Slovak'], ['sl', 'Slovenian'], ['so', 'Somali'], ['es', 'Spanish'], ['su', 'Sundanese'], ['sw', 'Swahili'], ['sv', 'Swedish'], ['tg', 'Tajik'], ['ta', 'Tamil'], ['tt', 'Tatar'], ['te', 'Telugu'], ['th', 'Thai'], ['ti', 'Tigrinya'], ['ts', 'Tsonga'], ['tr', 'Turkish'], ['tk', 'Turkmen'], ['ak', 'Twi'], ['uk', 'Ukrainian'], ['ur', 'Urdu'], ['ug', 'Uyghur'], ['uz', 'Uzbek'], ['vi', 'Vietnamese'], ['cy', 'Welsh'], ['xh', 'Xhosa'], ['yi', 'Yiddish'], ['yo', 'Yoruba'], ['zu', 'Zulu'],
].map(([code, label]) => ({ code, label, nativeLabel: label }))

const googleTranslateScript = 'https://translate.google.com/translate_a/element.js?cb=skrGoogleTranslateInit'

function savedLanguage() {
  const match = document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]+)/)
  return languages.some((language) => language.code === match?.[1]) ? match![1] as Language['code'] : 'en'
}

/**
 * A branded control for Google Translate. It translates the rendered document,
 * so new pages and content managed through the admin panel are covered too.
 */
export function LanguageSelector() {
  const [language] = useState<Language['code']>(savedLanguage)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const googleWindow = window as typeof window & {
      google?: GoogleTranslateApi
      skrGoogleTranslateInit?: () => void
    }

    googleWindow.skrGoogleTranslateInit = () => {
      if (googleWindow.google?.translate && !document.querySelector('#google_translate_element select')) {
        new googleWindow.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element',
        )
      }
    }

    if (googleWindow.google?.translate) googleWindow.skrGoogleTranslateInit()
    else if (!document.querySelector(`script[src="${googleTranslateScript}"]`)) {
      const script = document.createElement('script')
      script.src = googleTranslateScript
      script.async = true
      document.body.appendChild(script)
    }

    document.documentElement.lang = language
  }, [language])

  const chooseLanguage = (nextLanguage: Language['code']) => {
    setOpen(false)
    if (nextLanguage === language) return

    // The translate widget reads this cookie on load. Reloading retains the
    // current hash route and applies the selected language to all page text.
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `googtrans=/en/${nextLanguage}; expires=${expires}; path=/; SameSite=Lax`
    window.location.reload()
  }

  return (
    <div className="language-selector">
      <button
        type="button"
        className="language-button"
        aria-label="Choose website language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <FiGlobe aria-hidden="true" />
      </button>
      {open && (
        <div className="language-menu" role="listbox" aria-label="Website language">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`language-option ${item.code === language ? 'language-option-active' : ''}`}
              role="option"
              aria-selected={item.code === language}
              onClick={() => chooseLanguage(item.code)}
            >
              <span>{item.nativeLabel}</span>
              <small>{item.label}</small>
              {item.code === language && <FiCheck aria-label="Selected" />}
            </button>
          ))}
        </div>
      )}
      <div id="google_translate_element" aria-hidden="true" />
    </div>
  )
}
