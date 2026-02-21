# Site Pessoal – Davi Braga

Site pessoal para portfólio e LinkedIn, inspirado no estilo [lasinskas-me](https://lasinskas-me.vercel.app/projects/).

## O que tem

- **Início** – apresentação rápida
- **Work** – página “Lugares que trabalhei” com cards de experiência (Nubank, Flash, Conta Simples como exemplo)
- **About** – página sobre você (para editar)

## Como editar seus dados

1. **Experiências (Work)**  
   Edite o arquivo `src/data/experience.ts`. Cada item tem:
   - `company`, `role`, `description`, `period`
   - `tags` (ex: SQL, Python, Data Analyst)
   - `highlights` (lista de conquistas em tópicos)

2. **Texto da home**  
   Edite `src/app/page.tsx` (nome e frase de apresentação).

3. **About**  
   Edite `src/app/about/page.tsx` e coloque sua bio e links (LinkedIn, GitHub, etc.).

4. **Logo das empresas (opcional)**  
   Coloque imagens em `public/` (ex: `public/nubank.png`) e no `experience.ts` use `logo: "/nubank.png"` no item. Depois podemos ajustar o componente para exibir a imagem.

## Rodar localmente

```bash
cd davi-braga-site
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

1. Crie um repositório no GitHub e suba este projeto.
2. Acesse [vercel.com](https://vercel.com), faça login e “Import Project”.
3. Conecte o repositório; a Vercel detecta Next.js e faz o deploy.
4. Depois do deploy, use o link do site no seu LinkedIn (ex: “Website” no perfil).
