# DramaPlus

Plataforma web de mini-series asiaticas com catalogo, busca, detalhes, episodios, player, autenticacao Firebase e lista pessoal.

## Paginas

- `#/` - inicio
- `#/explorar` - catalogo com busca e filtros
- `#/lista` - minha lista
- `#/perfil` - perfil do usuario
- `#/login` - login
- `#/criar-conta` - cadastro
- `#/recuperar` - recuperacao de senha
- `#/serie/verao-seul` - detalhes e episodios
- `#/assistir/verao-seul` - player

## Firebase

Configure as credenciais em `firebase-config.js`, ative Google e Email/Password no Firebase Authentication e publique as regras de `firestore.rules`.

Para hospedar no Firebase Hosting:

```bash
firebase login
firebase use gen-lang-client-0216425764
firebase deploy --only hosting
```

O dominio esperado e `https://gen-lang-client-0216425764.web.app`.

## Publicacao automatica

O repositorio oficial e `https://github.com/antoniodomingosjoao/DoramaPlus`.

Na Netlify, o site deve estar conectado a esse repositorio com:

- Branch de producao: `main`
- Diretorio de publicacao: `.`
- Build command: vazio

Depois de conectar, cada `push` na branch `main` gera um novo deploy automaticamente. Para publicar uma alteracao local:

```bash
git add .
git commit -m "descreva a alteracao"
git push origin main
```

O arquivo `netlify.toml` ja deixa o diretorio e o fallback das rotas configurados.
