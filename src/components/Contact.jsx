import { useLang } from '../lib/lang'
import { PHONE, waLink } from '../lib/site'
import { PhoneIcon, WaIcon } from './Icon'

export function ContactButtons() {
  const { lang, t } = useLang()
  return (
    <div className="btns">
      <a className="btn btn-dark" href={`tel:${PHONE}`}><PhoneIcon /><span>{t.call}</span></a>
      <a className="btn btn-wa" href={waLink(lang)} target="_blank" rel="noopener noreferrer"><WaIcon /><span>{t.whatsapp}</span></a>
    </div>
  )
}
