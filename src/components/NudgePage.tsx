import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';
import './NudgePage.css';

type NudgePageVariant = 'overview' | 'privacy' | 'support';

interface NudgePageProps {
  variant?: NudgePageVariant;
}

const NudgePage: React.FC<NudgePageProps> = ({ variant = 'overview' }) => {
  const navigate = useNavigate();

  const isOverview = variant === 'overview';
  const isPrivacy = variant === 'privacy';
  const isSupport = variant === 'support';

  return (
    <div className="project-detail-container nudge-page">
      <button className="back-button" onClick={() => navigate('/projects')}>
        ← Back to Projects
      </button>

      <h1>{isOverview ? 'Nudge' : isPrivacy ? 'Nudge Privacy Policy' : 'Nudge Support'}</h1>

      <div className="project-tech-stack">
        <span className="tech-tag">Alexa Skills Kit</span>
        <span className="tech-tag">AWS Lambda</span>
        <span className="tech-tag">DynamoDB</span>
        <span className="tech-tag">Google Calendar API</span>
        <span className="tech-tag">OAuth 2.0</span>
      </div>

      <div className="project-links nudge-nav-links">
        <Link
          to="/projects/nudge"
          className={`project-link${isOverview ? ' nudge-link-active' : ''}`}
          aria-current={isOverview ? 'page' : undefined}
        >
          Overview
        </Link>
        <Link
          to="/projects/nudge/privacy"
          className={`project-link${isPrivacy ? ' nudge-link-active' : ''}`}
          aria-current={isPrivacy ? 'page' : undefined}
        >
          Privacy
        </Link>
        <Link
          to="/projects/nudge/support"
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
              <h2>Overview</h2>
              <ul>
                <li>Nudge turns Google Calendar events into spoken Alexa reminders.</li>
                <li>After one-time setup, an Echo routine can keep new events refreshed automatically.</li>
                <li>Existing reminders update or delete when calendar events change.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>What It Does</h2>
              <ul>
                <li>Creates spoken Echo reminders from upcoming Google Calendar events.</li>
                <li>Supports multiple calendars from one linked Google account.</li>
                <li>Uses Google event reminder overrides and calendar default reminder timing when available.</li>
                <li>Skips all-day, cancelled, free, and <code>#silent</code> events.</li>
                <li>Lets users trigger a silent quiet sync through an Echo routine.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Recommended Setup</h2>
              <ul>
                <li>Enable Nudge in Alexa and link the Google account that owns the calendar.</li>
                <li>Say “Alexa, ask nudge to sync my calendar.”</li>
                <li>Create one Echo routine with quiet refreshes at 7 AM, 11 AM, 3 PM, 7 PM, and 11 PM.</li>
                <li>Use the exact routine command: “ask nudge to run quiet sync.”</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Links</h2>
              <ul className="nudge-inline-links">
                <li>
                  <a href="https://github.com/myasumoto16/AlexaAnnouncer" target="_blank" rel="noopener noreferrer">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <Link to="/projects/nudge/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/projects/nudge/support">Support</Link>
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
                <li>Nudge uses Google Calendar data and Alexa account data only to create and maintain Alexa reminders tied to a user’s calendar events.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Information We Access</h2>
              <ul>
                <li>Google account information needed for account linking.</li>
                <li>Google Calendar event data needed to create or maintain reminders.</li>
                <li>Calendar IDs selected by the user.</li>
                <li>Reminder timing preferences and sync metadata.</li>
                <li>Alexa user identifier and reminder mapping metadata needed to update existing reminders.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Information We Store</h2>
              <ul>
                <li>Linked account state.</li>
                <li>Google refresh token in encrypted form.</li>
                <li>Selected calendars, sync state, and reminder settings.</li>
                <li>Reminder mappings and Google Calendar watch-channel metadata.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>How Data Is Used</h2>
              <ul>
                <li>Create Alexa reminders from Google Calendar events.</li>
                <li>Update or delete existing reminders when calendar events change.</li>
                <li>Avoid duplicate reminders and maintain Google Calendar sync state.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Data Retention and Deletion</h2>
              <ul>
                <li>Nudge keeps data only as long as needed to operate calendar sync and reminder maintenance.</li>
                <li>Users can say “Alexa, ask nudge to delete my data” to remove Nudge-owned sync records, reminder mappings, and calendar watch metadata.</li>
                <li>Users should also unlink Nudge or disable the skill in the Alexa app if they want to revoke Google account access through account linking.</li>
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
              <ul>
                <li>Enable Nudge in the Alexa app.</li>
                <li>Link the Google account that owns the calendar.</li>
                <li>Say “Alexa, ask nudge to sync my calendar.”</li>
                <li>Create one Echo routine that runs “ask nudge to run quiet sync” at 7 AM, 11 AM, 3 PM, 7 PM, and 11 PM.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Troubleshooting</h2>
              <ul>
                <li>If reminders do not appear, run a manual sync once and confirm the event is not all-day, cancelled, free, or marked <code>#silent</code>.</li>
                <li>If routine refresh does not work, confirm the routine runs on an Echo device, not the phone.</li>
                <li>If a reminder time does not match the event, confirm the event change is already visible in Google Calendar and run another sync.</li>
                <li>If Alexa reminder services are temporarily unavailable, wait a minute and try again.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Delete My Data</h2>
              <ul>
                <li>Say “Alexa, ask nudge to delete my data.”</li>
                <li>This removes Nudge-owned sync records, reminder mappings, and calendar watch metadata.</li>
                <li>If you also want to revoke Google account access, unlink Nudge or disable the skill in the Alexa app.</li>
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
      </div>
    </div>
  );
};

export default NudgePage;
