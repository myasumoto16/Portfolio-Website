import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';
import './NudgePage.css';
import nudgeArchitecture from '../assets/projects/nudge-architecture.svg';

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
        <span className="tech-tag">Google Apps Script</span>
        <span className="tech-tag">Voice Monkey</span>
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
            <p>Nudge is an Alexa skill that turns Google Calendar events into spoken Echo reminders. It is <strong>automatic after one-time setup</strong>, staying inside Amazon's reminder API constraints.</p>

            <section className="project-section">
              <h2>How It Works</h2>
              <p>The architecture is reminder-first:</p>
              <pre className="nudge-flow">{`manual sync or quiet routine sync
  → create real spoken Alexa Reminders
  → store Google event → Alexa alertToken mappings

Google Calendar changes later
  → webhook + incremental sync
  → update/delete existing Alexa Reminders automatically

brand-new event later
  → picked up on next manual sync or Echo routine run`}</pre>
              <ul>
                <li><strong>New reminders can only be created during an active skill session.</strong> The Alexa Reminders API rejects creation requests from background Lambdas — Amazon does not allow a skill to silently push a new spoken reminder without the user being in session. This is why new events always require a sync (manual or Echo routine).</li>
                <li>Existing reminders can be updated or deleted out-of-session using the stored <code>alertToken</code>, so calendar changes are handled automatically via background Skill Messaging.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Recommended Setup</h2>
              <ol className="nudge-step-list">
                <li>Enable Nudge and link Google Calendar.</li>
                <li>Say: <code>Alexa, ask nudge to sync my calendar</code></li>
                <li>Create one Alexa routine on the Echo device:<br />
                  <code>7:00 AM → ask nudge to run quiet sync → wait 4 hours → repeat ×4</code>
                </li>
              </ol>
              <p>After that: new events are picked up on the next routine run, changed events update existing reminders automatically, and deleted or silenced events remove reminders automatically.</p>
            </section>

            <section className="project-section">
              <h2>Features</h2>
              <ul>
                <li>Spoken Echo reminders from Google Calendar events</li>
                <li>Configurable default reminder timing</li>
                <li>Google event override and calendar default reminder timing</li>
                <li>Multiple calendars from one linked Google account</li>
                <li>Filters: all-day, cancelled, free/transparent, <code>#silent</code> / <code>[silent]</code></li>
                <li>Background update/delete of existing reminders</li>
                <li>Quiet sync intent for routines</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Architecture</h2>
              <img src={nudgeArchitecture} alt="Nudge architecture overview" style={{ width: '100%', borderRadius: '8px', marginTop: '8px' }} />
            </section>

            <section className="project-section">
              <h2>Personal Extension</h2>
              <p>For continuous personal use, a decoupled webhook pipeline fires quiet sync every 60 seconds without any local runtime:</p>
              <pre className="nudge-flow">{`Google Apps Script (60-second time-driven cron)
  ──(HTTPS GET)──> Voice Monkey REST API
  ──(virtual sensor state change)──> Alexa smart home event
  ──> Echo routine fires "ask nudge to run quiet sync"`}</pre>
              <ul>
                <li><strong>Google Apps Script</strong> runs <code>UrlFetchApp.fetch()</code> every 60 seconds — loop stays alive even when the local machine is off.</li>
                <li><strong>Voice Monkey</strong> toggles a virtual contact sensor registered as an Alexa smart home device.</li>
                <li><strong>Security:</strong> one-way HTTP GET only — Voice Monkey cannot query local devices or credentials.</li>
                <li>This is a personal setup and is not part of the standard user flow.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Links</h2>
              <ul className="nudge-inline-links">
                <li>
                  <Link to="/projects/nudge/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/projects/nudge/support">Support</Link>
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
            <p className="nudge-last-updated"><em>Last updated: 2026-06-26</em></p>

            <section className="project-section">
              <h2>Summary</h2>
              <ul>
                <li>Nudge uses Google Calendar data and Alexa account data only to create and maintain Alexa reminders tied to a user's calendar events.</li>
                <li>Nudge is developed and operated by Masakazu Yasumoto.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Google API Services User Data Policy</h2>
              <p>
                Nudge's use and transfer of information received from Google APIs to any other app
                will adhere to the{' '}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
            </section>

            <section className="project-section">
              <h2>Information We Access</h2>
              <ul>
                <li>Google account information needed for account linking (Google account ID and the email address associated with the linked account).</li>
                <li>Google Calendar event data (event title, start and end time, status, and reminder overrides) needed to create or maintain Alexa reminders.</li>
                <li>Calendar IDs selected by the user.</li>
                <li>Reminder timing preferences and sync metadata.</li>
                <li>Alexa user identifier and reminder mapping metadata needed to update existing reminders.</li>
              </ul>
              <p>
                Nudge requests the following Google OAuth scopes, kept to the minimum needed to operate:
              </p>
              <ul>
                <li><code>https://www.googleapis.com/auth/calendar.readonly</code> — read-only access to the user's calendars and events.</li>
                <li><code>email</code> — the email address associated with the linked Google account.</li>
                <li><code>openid</code> — the Google account identifier used for account linking.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Information We Store</h2>
              <ul>
                <li>Linked account state.</li>
                <li>Google refresh token, encrypted at the application layer before storage.</li>
                <li>Selected calendars, sync state, and reminder settings.</li>
                <li>Reminder mappings and Google Calendar watch-channel metadata.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Data Storage and Security</h2>
              <ul>
                <li>Nudge data is stored in Amazon DynamoDB in the AWS <code>us-east-1</code> region.</li>
                <li>DynamoDB tables use AWS-managed encryption at rest.</li>
                <li>Google refresh tokens receive additional application-layer encryption using AES-256-GCM before being written to DynamoDB.</li>
                <li>All network traffic between Nudge and Google, Alexa, and AWS APIs is encrypted in transit over HTTPS/TLS.</li>
                <li>Nudge runs on AWS Lambda using IAM least-privilege roles, so each function can access only the data it needs to perform its task.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>How Data Is Used</h2>
              <ul>
                <li>Create Alexa reminders from Google Calendar events.</li>
                <li>Update or delete existing Alexa reminders when calendar events change.</li>
                <li>Avoid duplicate reminders and maintain Google Calendar sync state.</li>
                <li>Use Google Calendar read-only data only to provide Nudge functionality requested by the user.</li>
                <li>Nudge does not sell Google user data.</li>
                <li>Nudge does not use Google user data for advertising.</li>
                <li>Nudge does not use Google user data to train generalized AI or machine learning models.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Sharing and Google User Data</h2>
              <p>
                Nudge shares the minimum data needed with the following service providers, only to operate the skill:
              </p>
              <ul>
                <li><strong>Google Calendar API</strong> — to read the user's calendar events so Nudge can create matching Alexa reminders.</li>
                <li><strong>Amazon Alexa (Reminders API, Skill Messaging, Proactive Events API)</strong> — to create, update, and deliver spoken reminders on the user's Echo devices.</li>
                <li><strong>Amazon Web Services (AWS Lambda, Amazon DynamoDB, Amazon API Gateway, in <code>us-east-1</code>)</strong> — to host Nudge's compute, store sync state and reminder mappings, and receive Google Calendar webhook notifications.</li>
              </ul>
              <p>
                Nudge does not share Google user data with any other third party, and these providers receive data only as needed to provide the service.
              </p>
            </section>

            <section className="project-section">
              <h2>Data Retention and Deletion</h2>
              <ul>
                <li>Long-term Nudge records (linked account state, encrypted Google refresh token, calendar IDs, reminder mappings, and sync state) are kept until the user requests deletion.</li>
                <li>Short-lived records expire automatically through DynamoDB TTL:
                  <ul>
                    <li>Temporary Google account-linking token records are deleted within 7 days.</li>
                    <li>Past due-event records are deleted approximately one hour after the event fires.</li>
                  </ul>
                </li>
                <li>Users can request deletion at any time by either:
                  <ul>
                    <li>saying "Alexa, ask nudge to delete my data" while the skill is enabled, or</li>
                    <li>emailing <a href="mailto:yasumotom98@gmail.com">yasumotom98@gmail.com</a> from the email address associated with the linked Google account.</li>
                  </ul>
                </li>
                <li>Email deletion requests are handled within 30 days of receipt.</li>
                <li>Disabling the skill in the Alexa app stops new reminders but does not by itself delete Nudge-owned data. Use the delete intent or email request to remove stored data.</li>
                <li>To fully revoke Google account access, unlink Nudge or disable the skill in the Alexa app.</li>
              </ul>
            </section>

            <section className="project-section">
              <h2>Children's Data</h2>
              <p>
                Nudge is not directed to children under 13, and Nudge does not knowingly collect
                personal data from children under 13. If a parent or guardian believes a child has
                provided personal data to Nudge, please contact{' '}
                <a href="mailto:yasumotom98@gmail.com">yasumotom98@gmail.com</a> and the data will
                be deleted.
              </p>
            </section>

            <section className="project-section">
              <h2>Changes to This Policy</h2>
              <p>
                This privacy policy may be updated from time to time. Material changes will be
                reflected by updating the "Last updated" date at the top of this page and, where
                appropriate, by an announcement in the Nudge skill description on Alexa. Users are
                encouraged to review this policy periodically.
              </p>
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
                <li>Enable Nudge in the Alexa app.</li>
                <li>Link the Google account that owns the calendar.</li>
                <li>Say "Alexa, ask nudge to sync my calendar."</li>
                <li>Create one Echo routine that runs "ask nudge to run quiet sync" at 7 AM, 11 AM, 3 PM, 7 PM, and 11 PM.</li>
              </ol>
            </section>

            <section className="project-section">
              <h2>Routine Instructions</h2>
              <ol className="nudge-step-list">
                <li>Open the Alexa app.</li>
                <li>Create a routine that runs on an Echo device.</li>
                <li>Set the first trigger for 7 AM.</li>
                <li>Add the custom command "ask nudge to run quiet sync."</li>
                <li>Add a 4-hour wait and repeat the same custom command.</li>
                <li>Continue until the routine covers 7 AM, 11 AM, 3 PM, 7 PM, and 11 PM.</li>
              </ol>
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
                <li>Say "Alexa, ask nudge to delete my data."</li>
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
