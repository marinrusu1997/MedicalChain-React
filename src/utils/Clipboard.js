
export class Clipboard {
   static _fallbackCopy = (text, onSucc, onErr) => {
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
         document.execCommand('copy') ? onSucc() : onErr()
      } catch (err) {
         console.error('Fallback: Oops, unable to copy', err)
         onErr()
      }

      document.body.removeChild(textArea)
   }

   static copy = (text, onSucc, onErr) => {
      if (!navigator.clipboard) {
         return this._fallbackCopy(text, onSucc, onErr)
      }
      navigator.clipboard.writeText(text).then(onSucc, onErr)
   }
}