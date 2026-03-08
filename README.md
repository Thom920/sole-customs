# SoleCustoms

SoleCustoms is een Nuxt 4 webshop voor custom sneakers.
De app haalt sneakers op uit Supabase, laat gebruikers producten filteren per merk, en ondersteunt een simpele cart + checkout flow.

## Features

- Overzichtspagina met sneakers
- Filteren op merk
- Productdetailpagina per sneaker
- Winkelmandje met totaalprijs en verwijderen van sneakers
- Simpele checkout-flow
- `Mijn Account` pagina met bestellingen-overzicht

## Tech Stack

- Nuxt 4
- Vue 3 + TypeScript
- Tailwind CSS
- Supabase (database)

## Projectstructuur

Belangrijkste mappen/bestanden:

- `app/pages/index.vue`: catalogus + merkfilters
- `app/pages/sneaker/[id].vue`: productdetailpagina
- `app/pages/checkout.vue`: winkelmand + checkout
- `app/pages/account.vue`: accountpagina met bestellingen
- `app/composables/useCart.ts`: winkelmand-state
- `app/composables/useOrders.ts`: order-state (localStorage)
- `app/composables/useToast.ts`: toastmeldingen
- `app/types/sneaker.ts`: type voor sneakers
- `app/types/order.ts`: type voor bestellingen
- `supabase/setup.sql`: SQL om tabel + seed-data aan te maken

## Vereisten

- Node.js
- npm 10+ (of vergelijkbaar)
- Een Supabase project

## Installatie

1. Installeer dependencies:

```bash
npm install
```

2. Maak een `.env` bestand in de root van het project op basis van `.env.example`:

```env
SUPABASE_URL=jouw-project-url-hier
SUPABASE_KEY=jouw-anon-key-hier
```

3. Vul je echte Supabase values in:

- `SUPABASE_URL`: Project URL uit Supabase dashboard
- `SUPABASE_KEY`: anon/public key uit Supabase dashboard

## Database Setup (Supabase)

1. Open je Supabase project.
2. Ga naar SQL Editor.
3. Open `supabase/setup.sql` in dit project.
4. Kopieer de SQL en voer die uit in Supabase.

Dit script doet het volgende:

- Maakt de `sneakers` tabel aan
- Vult de tabel met voorbeeldproducten

## Lokaal starten

Start de development server:

```bash
npm run dev
```

Open daarna:

- `http://localhost:3000`

## Hoe werkt de accountpagina?

Bij een succesvolle checkout wordt er een bestelling aangemaakt op de client-side.
Die bestellingen worden bewaard in `localStorage`, en getoond op `/account`.

- Bestellingen zijn niet gekoppeld aan echte gebruikersauthenticatie
