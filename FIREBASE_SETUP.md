# Firebase setup

1. Crie um projeto no Firebase Console.
2. Ative Authentication > Sign-in method > Google e Email/Password.
3. Crie um Firestore Database em modo de produção.
4. Copie a configuração do Web App para `firebase-config.js`.
5. Publique as regras de `firestore.rules` no Firestore.
6. Em Authentication > Settings > Authorized domains, adicione `gen-lang-client-0216425764.web.app`.
7. Se também usar o Netlify, adicione `doramas.netlify.app`. Mantenha `localhost` para desenvolvimento local.
8. O domínio precisa estar exatamente como `gen-lang-client-0216425764.web.app`, sem `https://` e sem barra no final.

O `authDomain` em `firebase-config.js` deve continuar como `gen-lang-client-0216425764.firebaseapp.com`. Os domínios `gen-lang-client-0216425764.web.app` e `doramas.netlify.app` são origens autorizadas do site, não substitutos do `authDomain`.

Para testar, abra o app por `https://gen-lang-client-0216425764.web.app`, nunca por `file://`. Se o app estiver hospedado somente no Netlify, trocar o domínio no Firebase Console não move o site automaticamente: é necessário publicar os arquivos no Firebase Hosting ou continuar usando `doramas.netlify.app`.

Para publicar no Firebase Hosting, na pasta do projeto execute:

```bash
firebase login
firebase use gen-lang-client-0216425764
firebase deploy --only hosting
```

O app usa:

- Firebase Authentication para login, cadastro, Google e logout.
- Firestore na coleção `users`, com um documento por `uid`.
- O campo `list` guarda os IDs das séries salvas pelo usuário.

Enquanto `firebase-config.js` estiver com os placeholders, o app usa `localStorage` como fallback local.
