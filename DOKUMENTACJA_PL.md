# Dokumentacja Projektu Systemu Społecznościowego (WSB)

**Wersja:** 1.0.0
**Data:** 2026-01-20
**Autor:** Antigravity (Assistant)

---

## 1. Wprowadzenie

Projekt jest nowoczesną aplikacją typu Single Page Application (SPA) służącą do obsługi sieci społecznościowej skupionej na profilach akademickich i zawodowych (inspirowana LinkedIn/ResearchGate). Aplikacja umożliwia użytkownikom publikowanie treści, zarządzanie siecią kontaktów, komunikację w czasie rzeczywistym oraz interakcję z powiadomieniami.

## 2. Stos Technologiczny

Aplikacja została zbudowana przy użyciu nowoczesnych technologii webowych:

*   **Framework:** Next.js 14
*   **Język:** TypeScript
*   **Biblioteka UI:** React 18
*   **Stylowanie:** Tailwind CSS
*   **Komponenty:** Radix UI (primitives), Lucide React (ikony)
*   **Zarządzanie Stanem:** React Context API (AppContext)
*   **Powiadomienia:** Sonner (Toast system)

## 3. Architektura Systemu

### 3.1 Struktura Katalogów
*   `/src/app` - Routing i layouty (Next.js App Router).
*   `/src/components` - Komponenty interfejsu użytkownika (UI).
*   `/src/contexts` - Logika biznesowa i stan globalny.
*   `/src/styles` - Globalne arkusze stylów.

### 3.2 Zarządzanie Stanem (AppContext)
Centralnym punktem logiki aplikacji jest `AppContext` (`src/contexts/AppContext.tsx`). Zarządza on:
*   **Użytkownikami:** Dane autoryzowanego użytkownika (`currentUser`) oraz baza wszystkich użytkowników (`allUsers`).
*   **Postami:** Tablica postów, obsługa lajkowania, komentowania i zapisywania.
*   **Powiadomieniami:** System notyfikacji o aktywnościach.
*   **Wiadomościami:** Historia czatów i przesyłanie wiadomości.
*   **Zaproszeniami:** Logika wysyłania i akceptacji zaproszeń do kontaktów.

## 4. Główne Moduły Funkcjonalne

### 4.1 Moduł Wiadomości (Messages)
*   **Plik:** `src/components/messages/MessagesPage.tsx`
*   **Opis:** Pełnoekranowy widok czatu.
*   **Funkcjonalności:**
    *   Lista konwersacji z podglądem ostatniej wiadomości.
    *   Wyszukiwanie kontaktów.
    *   Dynamiczne okno czatu.
    *   Obsługa wysyłania wiadomości w czasie rzeczywistym (symulowana zmianą stanu).

### 4.2 Sieć Kontaktów (Network)
*   **Plik:** `src/components/NetworkTab.tsx`
*   **Opis:** Zarządzanie relacjami z innymi użytkownikami.
*   **Sekcje:**
    *   **Połączenia:** Lista aktywnych znajomych.
    *   **Zaproszenia:** Otrzymane i wysłane prośby o kontakt.
    *   **Sugestie:** Propozycje osób do poznania (algorytm oparty na braku połączenia).

### 4.3 Powiadomienia (Notifications)
*   **Plik:** `src/components/NotificationsTab.tsx`
*   **Opis:** Centrum aktywności.
*   **Typy zdarzeń:** Polubienia, komentarze, zaproszenia, udostępnienia.
*   **Funkcje:** Oznaczanie jako przeczytane (pojedynczo lub zbiorczo).

### 4.4 Feed i Posty (Home)
*   **Komponenty:** `PostCard.tsx`, `NewPostCard.tsx`
*   **Opis:** Główna tablica z treściami. Obsługa multimediów, PDF, YouTube.

## 5. Raport z Ostatnich Prac Naprawczych

### 5.1 Naprawa Wyświetlania Wiadomości
**Problem:** Nowo utworzone konwersacje nie pozwalały na wysłanie pierwszej wiadomości, ponieważ system nie potrafił zidentyfikować odbiorcy przed fizycznym utworzeniem obiektu `Conversation`.
**Rozwiązanie:** Zmodyfikowano funkcję `getOtherParticipant` w `MessagesPage.tsx`. Dodano logikę "fallback", która w przypadku braku istniejącej konwersacji, wyszukuje użytkownika w bazie `allUsers` na podstawie przewidywanego ID konwersacji.

## 6. Znane Problemy (Known Issues)

1.  **System Zaproszeń (Network):** Obiekt `ConnectionRequest` nie przechowuje informacji o odbiorcy (`to`). Powoduje to, że filtry zaproszeń opierają się jedynie na nadawcy, co jest błędem logicznym do naprawy w przyszłych iteracjach.
2.  **Powiadomienia:** Brak deep-linkowania (kliknięcie w powiadomienie nie przenosi do treści).
