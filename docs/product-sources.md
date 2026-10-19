# Produktkatalog und Store-Recherche

Der Katalog umfasst neun zu David Schaber gehörende Projekte. Die Einträge
belegen die Zugehörigkeit und Produktinformationen, nicht die aktuelle
Verfügbarkeit in einem Store. Ein vollständiger Abgleich mit den beiden
Entwicklerprofilen steht noch aus. Private oder weitere veröffentlichte
Projekte können darüber hinaus existieren.

## Quellen

| Projekt                   | Herkunft der Produktinformationen                                                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sandslinger               | Vom Betreiber bereitgestellte Originalgrafik; [öffentliche Produkt-/Datenschutzseite](https://github.com/DavidSchaber7/sandslinger/blob/main/index.html)                                                                                                                                   |
| Dead Air                  | Vom Betreiber bestätigtes Projekt und bereitgestellte Originalgrafik                                                                                                                                                                                                                       |
| BQ Prüfung                | [App-Konfiguration](https://github.com/DavidSchaber7/bq-pruefung/blob/main/app.json), [Store-Beschreibung](https://github.com/DavidSchaber7/bq-pruefung/blob/main/APP_STORE_LISTING.md)                                                                                                    |
| TinyMinds                 | [Produktwebsite mit bestehendem Apple-Link](https://github.com/DavidSchaber7/tiny-minds-website/blob/main/index.html)                                                                                                                                                                      |
| HQ Prüfung Metall         | [App-Konfiguration](https://github.com/DavidSchaber7/hq-metall/blob/main/app.json), [Store-Beschreibung](https://github.com/DavidSchaber7/hq-metall/blob/main/APP_STORE_LISTING.md), [Apple-App-ID](https://github.com/DavidSchaber7/hq-metall/blob/main/eas.json)                         |
| HQ Prüfung Elektrotechnik | [App-Konfiguration](https://github.com/DavidSchaber7/hq-elektrotechnik/blob/main/app.json), [Store-Beschreibung](https://github.com/DavidSchaber7/hq-elektrotechnik/blob/main/APP_STORE_LISTING.md), [Apple-App-ID](https://github.com/DavidSchaber7/hq-elektrotechnik/blob/main/eas.json) |
| FachwirtTrainer           | [Produkt-/Supportseite mit Betreiberangabe](https://github.com/DavidSchaber7/fachwirttrainer-web/blob/main/index.html)                                                                                                                                                                     |
| §34a Sachkunde Trainer    | [Produkt-/Supportseite mit Betreiberangabe](https://github.com/DavidSchaber7/sachkunde34a-web/blob/main/index.html)                                                                                                                                                                        |
| Sheep Jam                 | [Datenschutz-/Produktangaben mit Betreiberidentität](https://github.com/DavidSchaber7/sheepjam/blob/main/index.html)                                                                                                                                                                       |

`aiflix_mvp` wurde als weiteres öffentliches Repository gefunden, aber nicht
als bestätigtes App-/Game-Produkt aufgenommen.

## Vorhandene IDs und noch offene Store-Prüfung

| Projekt                                                                   | Apple                                                               | Android-Paketname         |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------- |
| BQ Prüfung                                                                | Noch nicht ermittelt                                                | `com.bqpruefung.app`      |
| TinyMinds                                                                 | Bestehender Link: https://apps.apple.com/app/tinyminds/id6761198383 | Noch nicht ermittelt      |
| HQ Prüfung Metall                                                         | `6794923071` aus `submit.production.ios.ascAppId`                   | `de.hqmetall.app`         |
| HQ Prüfung Elektrotechnik                                                 | `6794086070` aus `submit.production.ios.ascAppId`                   | `de.hqelektrotechnik.app` |
| Sandslinger, Dead Air, Sheep Jam, FachwirtTrainer, §34a Sachkunde Trainer | Noch nicht ermittelt                                                | Noch nicht ermittelt      |

Eine konfigurierte Apple-App-ID oder ein Android-Paketname beweist keine
aktuelle Store-Veröffentlichung. Deshalb wurden daraus noch keine neuen
Download-Schaltflächen erzeugt. Der vorhandene TinyMinds-Link bleibt erhalten.
Bei nicht bestätigten Store-Links führen die Produktkarten zur dokumentierten
Produktwebsite oder ermöglichen eine direkte Anfrage.

## Fortsetzung

Der direkte Zugriff auf `itunes.apple.com`, `apps.apple.com`, `play.google.com`
und die eigenen Produktdomains wurde vom Egress-Proxy mit HTTP 403 abgelehnt.
Die benötigten Domains wurden additiv im Cloud-Konfigurationsentwurf
hinterlegt; bestehende Freigaben blieben erhalten. Das Speichern des Entwurfs
hat die Richtlinie der laufenden Maschine nicht aktualisiert.

Nach Anwenden der Netzwerkkonfiguration:

1. TinyMinds über Apples Lookup-API mit der bekannten App-ID abrufen und das
   Entwicklerprofil über `artistId` bestimmen. Dessen App-Katalog abrufen.
2. Die Google-Play-Entwicklerseite bestimmen und alle Titel mit Name und
   Entwickleridentität abgleichen. Nur tatsächlich vorhandene Produktseiten
   verwenden; keine Paketnamen oder numerischen IDs raten.
3. Pro Produkt verfügbare Apple-/Google-Links ergänzen. Eine nicht gefundene
   Plattform nicht als „bald verfügbar“ oder „nicht veröffentlicht“ ausgeben.
4. Zusätzliche bestätigte Titel ergänzen; Kataloganzahl, Filter, Footer und
   Metadaten abgleichen. Die Bühne zeigt bewusst nur vier ausgewählte Titel.
5. Store-Links in den Karten und den daraus erzeugten Detaildialogen prüfen,
   danach Desktop-/Mobiltests und lokale Referenzprüfung wiederholen.
