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
              <h2>Getting Started</h2>
              <ol className="nudge-step-list">
                <li>Install Paws and open it — the onboarding will walk you through full setup.</li>
                <li>Enable grayscale: Settings → Accessibility → Display &amp; Text Size → Color Filters → Grayscale.</li>
                <li>Save the black wallpaper (tap "Save wallpaper" in the app) and set it as your home screen background.</li>
                <li>Use Focus Mode to show only one home screen page — the one with the Paws widget.</li>
                <li>Add the Paws widget (Large or Extra Large) to that page.</li>
                <li>Set your PIN in the app, then add apps and mark social media / distracting apps as restricted.</li>
              </ol>
            </section>

            <section className="project-section">
              <h2>Common Issues</h2>
              <ul>
                <li><strong>Widget shows "open paws to add apps":</strong> Open the Paws app, add at least one app, then long-press the widget and select your group.</li>
                <li><strong>Widget not updating after changes:</strong> iOS throttles widget refreshes. Wait a few seconds or lock and unlock the screen.</li>
                <li><strong>An app doesn't open from the widget:</strong> Some apps (Phone, FaceTime) require a Shortcut instead of a URL scheme. Open the app in Paws, tap the app name to edit, and switch to "shortcut" mode.</li>
                <li><strong>Forgot PIN:</strong> There is no PIN recovery — this is intentional. Delete and reinstall Paws to reset. Your app list will be lost.</li>
                <li><strong>PIN lockout:</strong> After 5 wrong attempts you're locked out for 30 seconds. Subsequent failures extend the lockout up to 10 minutes.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Reset the App</h2>
              <ul>
                <li>To reset all data: delete Paws from your device and reinstall from the App Store.</li>
                <li>To re-run onboarding: Settings (⚙ in the app) → Re-run setup.</li>
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
