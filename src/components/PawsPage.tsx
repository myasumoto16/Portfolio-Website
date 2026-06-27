import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NudgePage.css';

type PawsPageVariant = 'overview' | 'privacy' | 'support';

interface PawsPageProps {
  variant?: PawsPageVariant;
}

const PawsPage: React.FC<PawsPageProps> = ({ variant = 'overview' }) => {
  const navigate = useNavigate();

  const isOverview = variant === 'overview';
  const isPrivacy = variant === 'privacy';
  const isSupport = variant === 'support';

  return (
    <div className="project-detail-container nudge-page">
      <button className="back-button" onClick={() => navigate('/projects')}>
        ← Back to Projects
      </button>

      <h1>{isOverview ? 'Paws 🐾' : isPrivacy ? 'Paws — Privacy Policy' : 'Paws — Support'}</h1>

      <div className="project-tech-stack">
        <span className="tech-tag">Swift</span>
        <span className="tech-tag">SwiftUI</span>
        <span className="tech-tag">WidgetKit</span>
        <span className="tech-tag">Keychain</span>
        <span className="tech-tag">iOS 17</span>
      </div>

      <div className="project-links nudge-nav-links">
        <Link
          to="/projects/paws"
          className={`project-link${isOverview ? ' nudge-link-active' : ''}`}
          aria-current={isOverview ? 'page' : undefined}
        >
          Overview
        </Link>
        <Link
          to="/projects/paws/privacy"
          className={`project-link${isPrivacy ? ' nudge-link-active' : ''}`}
          aria-current={isPrivacy ? 'page' : undefined}
        >
          Privacy
        </Link>
        <Link
          to="/projects/paws/support"
          className={`project-link${isSupport ? ' nudge-link-active' : ''}`}
          aria-current={isSupport ? 'page' : undefined}
        >
          Support
        </Link>
      </div>

      <div className="project-content">
        {isOverview && (
          <>
            <section className="project-section">
              <h2>What It Does</h2>
              <ul>
                <li>Replaces your home screen with a plain text list of apps — no icons, no color, no distraction.</li>
                <li>Free apps open immediately. Restricted apps require a countdown delay and a PIN before opening.</li>
                <li>The friction is the feature: when opening Instagram means waiting 30 seconds and typing a PIN, you start asking whether you actually want to.</li>
                <li>Paws is developed and operated by Masakazu Yasumoto.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>How It Works</h2>
              <ul>
                <li>A WidgetKit widget fills your home screen with a plain monospaced list of app names.</li>
                <li>Tapping a free app opens it immediately via its URL scheme.</li>
                <li>Tapping a restricted app starts a countdown (5–300 seconds, user-configured), then prompts for a 4-digit PIN.</li>
                <li>PIN is stored in the device Keychain — device-only, never backed up to iCloud.</li>
                <li>Repeated wrong PINs trigger an exponential lockout (30s → 1m → 5m → 10m).</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Setup</h2>
              <ol className="nudge-step-list">
                <li>Install Paws and complete the onboarding (takes ~5 minutes).</li>
                <li>Enable grayscale in iOS Settings → Accessibility → Display &amp; Text Size.</li>
                <li>Save the pure black wallpaper to Photos and set it as your home screen.</li>
                <li>Use Focus Mode to hide all home screen pages except the one with the Paws widget.</li>
                <li>Add the Paws widget to that one page and set your PIN.</li>
                <li>Add apps to your list and mark social media, news, or any other time-sink as restricted.</li>
              </ol>
            </section>

            <section className="project-section">
              <h2>Links</h2>
              <ul className="nudge-inline-links">
                <li>
                  <a href="https://github.com/myasumoto16/PawsApp" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li>
                  <Link to="/projects/paws/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/projects/paws/support">Support</Link>
                </li>
                <li>
                  <a href="mailto:yasumotom98@gmail.com">Contact</a>
                </li>
              </ul>
            </section>
          </>
        )}

        {isPrivacy && (
          <>
            <section className="project-section">
              <h2>Summary</h2>
              <ul>
                <li>Paws collects no personal data. Everything stays on your device.</li>
                <li>No accounts, no analytics, no ads, no network requests of any kind.</li>
                <li>Paws is developed and operated by Masakazu Yasumoto.</li>
                <li>Last updated: April 2026.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Data We Do Not Collect</h2>
              <ul>
                <li>No personal information, usage data, or analytics.</li>
                <li>No identifiers, device IDs, or advertising tokens.</li>
                <li>No crash reports sent anywhere — errors stay on device.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Data Stored on Your Device</h2>
              <ul>
                <li>Your app list and settings are stored in iOS UserDefaults via an App Group shared with the widget. This data may be included in iCloud device backups.</li>
                <li>Your PIN is stored in the iOS Keychain with <code>kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code> — it is never synced to iCloud and never leaves your device.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Permissions</h2>
              <ul>
                <li><strong>Photo Library (write only):</strong> used once during setup to save a pure black wallpaper image. Paws never reads your photos.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Third Parties</h2>
              <ul>
                <li>Paws uses no third-party SDKs, analytics services, or advertising networks.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Children's Privacy</h2>
              <ul>
                <li>Paws is not directed at children under 13. We do not knowingly collect any information from children.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Changes to This Policy</h2>
              <ul>
                <li>If this policy changes, the updated version will be posted here with a new "Last updated" date. Since Paws collects no data, changes are expected to be rare.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Contact</h2>
              <ul>
                <li>Email: <a href="mailto:yasumotom98@gmail.com">yasumotom98@gmail.com</a></li>
              </ul>
            </section>
          </>
        )}

        {isSupport && (
          <>
            <section className="project-section">
              <h2>Initial Setup</h2>
              <ol className="nudge-step-list">
                <li>Install Paws and open it — onboarding walks you through each step.</li>
                <li><strong>Grayscale:</strong> Settings → Accessibility → Display &amp; Text Size → Color Filters → turn on Color Filters → select Grayscale.</li>
                <li><strong>Remove the Search Button:</strong> Long press the home screen → Customize → turn off Search. (Or: Settings → Home Screen &amp; App Library → Show on Home Screen → Off.)</li>
                <li><strong>Empty the Dock:</strong> Drag every dock app upward onto the home screen. Once empty, the gray dock tray disappears.</li>
                <li><strong>Wallpaper:</strong> In Paws: Settings → SAVE WALLPAPER. Then in iOS: Settings → Wallpaper → + → Photos → select it → Set for Both Screens.</li>
                <li><strong>Focus Mode:</strong> Settings → Focus → + → Custom → name it → skip People/Apps → tap Customize Screens → deselect all pages except the Paws widget page → Done. To keep it always on: Add Schedule → Turn On Automatically → set a range covering your whole day.</li>
              </ol>
            </section>

            <section className="project-section">
              <h2>Adding the Widget</h2>
              <ul>
                <li><strong>How to add:</strong> Long press the home screen → tap + → search "Paws" → choose Large or Extra Large → tap Add Widget. Place it so it fills the page.</li>
                <li><strong>Important — Large icon size:</strong> After placing the widget, long press the home screen → Customize → set size to Large. Leave color as Automatic (do NOT select Dark — it overrides the widget background and breaks the color match).</li>
                <li><strong>One widget = one group:</strong> Each widget shows one group's apps. To show two sets, add the widget twice. Long press widget → Edit Widget → choose which group it shows.</li>
                <li><strong>Switch a widget's group:</strong> Long press the widget → Edit Widget → tap the Group field → select a different group.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Managing Apps</h2>
              <ul>
                <li><strong>Adding apps:</strong> Tap [ + ADD APP ] at the bottom of the main screen. You can browse presets, use Shortcut mode, add a web page, or enter a custom URL scheme.</li>
                <li><strong>[LOCK] vs [free]:</strong> Tap the label next to any app to toggle. [free] opens immediately. [LOCK] starts a countdown then asks for your PIN.</li>
                <li><strong>Edit an app:</strong> Tap the app name to rename it, change launch method, toggle restriction, move to another group, or delete it.</li>
                <li><strong>Reorder &amp; delete:</strong> Drag the handle on the right to reorder. Swipe left → Delete to remove.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Widget Groups</h2>
              <ul>
                <li><strong>What is a group?</strong> An ordered list of up to 6 apps shown on one widget. You can have as many groups as you want — one per widget on your home screen.</li>
                <li><strong>Create a group:</strong> Tap [ + ] in the group tab strip at the top of the main screen.</li>
                <li><strong>Navigate groups:</strong> Tap a chip in the tab strip to switch. Tap the active (white) chip to open the group editor.</li>
                <li><strong>Edit a group:</strong> Tap the active chip → rename, change font size/style, reorder apps, or delete the group.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Adding Apps via Shortcuts</h2>
              <p style={{fontSize: '0.9em', opacity: 0.7}}>Use this for apps that can't be opened reliably with a URL scheme from a widget (Camera, FaceTime, Phone, etc.).</p>
              <ul>
                <li><strong>Auto-create (known apps):</strong> Tap [ + OPEN VIA SHORTCUT ] → type the app name → tap [ AUTO-CREATE SHORTCUT ] → tap "Add Shortcut" in the share sheet → tap [ ADD TO WIDGET LIST ].</li>
                <li><strong>Manual setup:</strong> Tap [ + OPEN VIA SHORTCUT ] → enter name → tap [ OPEN SHORTCUTS APP ] → in Shortcuts: tap + → search "Open App" → pick the app → rename shortcut to match the name you entered → Done → back in Paws tap [ ADD TO WIDGET LIST ].</li>
                <li><strong>Shortcut Name vs Name on Widget:</strong> Name on Widget is what shows in the widget. Shortcut Name must exactly match the shortcut's name in the Shortcuts app.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Adding Web Pages</h2>
              <ul>
                <li>Tap [ + WEB PAGE ] → enter a name and URL → tap Add. Opens Safari directly to that URL.</li>
                <li>Web pages can be marked [LOCK] just like apps — useful for news sites, social feeds, etc.</li>
                <li>Enter the full URL starting with https://. If you skip the prefix, https:// is added automatically.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Custom URL Schemes</h2>
              <ul>
                <li>Many iOS apps register a custom URL like "spotify://" that opens them directly.</li>
                <li>Tap [ + CUSTOM URL SCHEME ] → enter the app name and URL scheme → tap [ ADD ].</li>
                <li>To find a scheme: search online for "[app name] iOS URL scheme". Examples: Spotify → spotify://, Telegram → tg://, Notion → notion://, Slack → slack://open.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Restrictions</h2>
              <ul>
                <li><strong>How it works:</strong> Tap a [LOCK] app in the widget → countdown starts → enter PIN → correct PIN opens the app → wrong PIN restarts the countdown.</li>
                <li><strong>Change delay:</strong> Settings → RESTRICTION DELAY slider (5 seconds to 5 minutes).</li>
                <li><strong>Change PIN:</strong> Settings → CHANGE PIN → enter current PIN → enter new PIN twice.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Common Issues</h2>
              <ul>
                <li><strong>Widget shows "open paws to add apps":</strong> Open Paws, add at least one app, then long-press the widget and select your group.</li>
                <li><strong>Widget not updating after changes:</strong> iOS throttles widget refreshes. Wait a few seconds or lock and unlock the screen.</li>
                <li><strong>An app doesn't open from the widget:</strong> Some apps require Shortcut mode. Tap the app name in Paws to edit it and switch to "shortcut" mode.</li>
                <li><strong>Forgot PIN:</strong> There is no PIN recovery — this is intentional. Delete and reinstall Paws to reset. Your app list will be lost.</li>
                <li><strong>PIN lockout:</strong> After 5 wrong attempts you're locked out for 30 seconds. Subsequent failures extend the lockout up to 10 minutes.</li>
                <li><strong>Reset everything:</strong> Settings (⚙ in the app) → Re-run Onboarding. Or delete and reinstall to wipe all data.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Contact</h2>
              <ul>
                <li>Email: <a href="mailto:yasumotom98@gmail.com">yasumotom98@gmail.com</a></li>
                <li>GitHub: <a href="https://github.com/myasumoto16/PawsApp" target="_blank" rel="noopener noreferrer">github.com/myasumoto16/PawsApp</a></li>
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PawsPage;
