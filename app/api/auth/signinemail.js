import { createTransport } from "nodemailer";

export async function CustomSendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transport.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  await new Promise((resolve, reject) => {
    // send mail
    transport.sendMail(
      {
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host, theme }),
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      }
    );
  });
}

function html(params) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `<!DOCTYPE html>
  <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
      <meta charset="utf-8" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="format-detection"
        content="telephone=no, date=no, address=no, email=no"
      />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>Let's get you signed in</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>
        img {
          max-width: 100%;
          vertical-align: middle;
          line-height: 100%;
          border: 0;
        }
        .hover-bg-slate-100:hover {
          background-color: #111827 !important;
        }
        .hover-bg-primary-600:hover {
          background-color: #5662cc !important;
        }
        .hover-text-slate-600:hover {
          color: #585e83 !important;
        }
        .hover-text-primary-600:hover {
          color: #003cdf !important;
        }
        @media (prefers-color-scheme: dark) {
          .dark-bg-gray-800 {
            background-color: #1e1e1e !important;
          }
          .dark-bg-gray-900 {
            background-color: #121212 !important;
          }
          .dark-bg-gray-50 {
            background-color: #f9fafb !important;
          }
          .dark-bg-gray-600 {
            background-color: #272727 !important;
          }
          .dark-text-gray-200 {
            color: #ababab !important;
          }
          .dark-text-gray-50 {
            color: #f9fafb !important;
          }
          .dark-text-gray-800 {
            color: #1e1e1e !important;
          }
          .dark-text-gray-900 {
            color: #121212 !important;
          }
          .dark-text-primary-500 {
            color: #0047ff !important;
          }
          .dark-text-primary-200 {
            color: #94b5ff !important;
          }
          .dark-hover-bg-gray-50:hover {
            background-color: #f9fafb !important;
          }
          .dark-hover-text-gray-100:hover {
            color: #d5d5d5 !important;
          }
          .dark-hover-text-primary-100:hover {
            color: #c6d9ff !important;
          }
        }
        @media (max-width: 648px) {
          .sm-mt-0 {
            margin-top: 0 !important;
          }
          .sm-block {
            display: block !important;
          }
          .sm-hidden {
            display: none !important;
          }
          .sm-h-px {
            height: 1px !important;
          }
          .sm-w-full {
            width: 100% !important;
          }
          .sm-py-3 {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }
          .sm-px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .sm-px-6 {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .sm-leading-10 {
            line-height: 40px !important;
          }
        }
      </style>
    </head>
    <body
      class="dark-bg-gray-900"
      style="
        margin: 0;
        width: 100%;
        padding: 0;
        word-break: break-word;
        -webkit-font-smoothing: antialiased;
        background-color: #8d99ae;
      "
    >
      <div style="display: none">
        Let's get you signed in &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
        &#847; &#847; &#847;
      </div>
      <div
        role="article"
        aria-roledescription="email"
        aria-label="Let's get you signed in"
        lang="en"
        style="font-size: 16px; font-size: 1rem; font-size: max(16px, 1rem)"
      >
        <table
          style="
            width: 100%;
            font-family: 'Inter', ui-sans-serif, system-ui, -apple-system,
              'Segoe UI', sans-serif;
          "
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td align="center">
              <div style="max-height: 40px">
                <div
                  class="dark-bg-gray-900"
                  style="height: 300px; background-color: #111827"
                ></div>
              </div>
              <table
                class="sm-w-full"
                style="
                  position: relative;
                  max-height: 0;
                  width: 568px;
                  opacity: 0.999;
                "
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td style="vertical-align: top" valign="top">
                    <div class="sm-px-6">
                      <table
                        style="width: 100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                      >
                        <tr>
                          <td
                            class="sm-px-6"
                            style="padding-left: 40px; padding-right: 40px"
                          >
                            <table
                              style="width: 100%"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            >
                              <tr>
                                <td>
                                  <a
                                    href="http://localhost:3000"
                                    class="dark-text-gray-50"
                                    style="
                                      text-decoration: none;
                                      color: #fff;
                                      height: 50px;
                                      width: 50px;
                                    "
                                  >
                                    <img
                                      src="https://i.ibb.co/3pKBgc8/logo-text.png"
                                      alt="AI Prompts Logo"
                                      width="300"
                                      height="120"
                                    />
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <div role="separator" style="line-height: 40px">&zwnj;</div>
                      <table
                        class="dark-bg-gray-600"
                        style="
                          width: 100%;
                          border-radius: 8px;
                          background-color: #2d2740;
                          box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.04),
                            0px 20px 25px -5px rgba(0, 0, 0, 0.1);
                        "
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                      >
                        <tr>
                          <td class="sm-px-6" style="padding: 40px">
                            <table
                              style="width: 100%"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            >
                              <tr>
                                <td>
                                  <h1
                                    class="dark-text-gray-50"
                                    style="
                                      margin: 0;
                                      font-size: 36px;
                                      font-weight: 700;
                                      line-height: 1;
                                      letter-spacing: -0.025em;
                                      color: #fff;
                                    "
                                  >
                                    Let's get you signed in
                                  </h1>
                                  <div role="separator" style="line-height: 24px">
                                    &zwnj;
                                  </div>
                                  <p
                                    class="dark-text-gray-50"
                                    style="
                                      margin: 0;
                                      font-size: 18px;
                                      line-height: 20px;
                                      color: #f9fafb;
                                    "
                                  >
                                    Hi There User,
                                    <br />
                                    <br />
                                  </p>
                                  <p
                                    class="dark-text-gray-50"
                                    style="
                                      margin: 0;
                                      font-size: 16px;
                                      line-height: 26px;
                                      color: #f9fafb;
                                    "
                                  >
                                    We use this easy sign-in button so you don't
                                    have to remember or type in yet another long
                                    password.
                                  </p>
                                </td>
                              </tr>
                              <tr role="separator">
                                <td style="line-height: 24px">&zwnj;</td>
                              </tr>
                              <tr>
                                <td>
                                  <a
                                    href="${url}"
                                    class="sm-block dark-text-primary-500 hover-bg-primary-600 dark-bg-gray-50 dark-hover-bg-gray-50"
                                    style="
                                      text-decoration: none;
                                      display: inline-block;
                                      border-radius: 8px;
                                      background-color: #5662cc;
                                      padding: 14px 24px;
                                      text-align: center;
                                      font-size: 16px;
                                      font-weight: 700;
                                      color: #f9fafb;
                                      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06),
                                        0px 4px 6px -1px rgba(0, 0, 0, 0.1);
                                    "
                                  >
                                    <span style="mso-text-raise: 15px"
                                      >Sign in</span
                                    >
                                  </a>
                                  <div role="separator" style="line-height: 24px">
                                    &zwnj;
                                  </div>
                                  <p style="margin: 0; font-size: 16px">
                                    <span style="font-weight: 700; color: #f9fafb"
                                      >Or copy and paste the following URL into
                                      your browser:</span
                                    >
                                    <br />
                                    <a
                                      href="${url}"
                                      class="hover-text-primary-600 dark-text-primary-200 dark-hover-text-primary-100"
                                      style="
                                        text-decoration: none;
                                        font-size: 11px;
                                        line-height: 26px;
                                        color: #7fd9f5;
                                      "
                                    >
                                      ${url}
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
              <div
                class="sm-leading-10"
                role="separator"
                style="line-height: 30px"
              >
                &zwnj;
              </div>
              <table
                class="sm-w-full dark-text-gray-200"
                style="width: 568px; color: #767e9d"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td style="padding-left: 40px; padding-right: 40px">
                    <a
                      href="https://example.com"
                      class="dark-text-gray-50"
                      style="
                        text-decoration: none;
                        font-weight: 700;
                        color: #1E2A45;
                      "
                    >
                      AI PROMPTS WEBSITE
                    </a>
                    <div style="line-height: 16px">&zwnj;</div>
                    <table
                      class="sm-w-full"
                      style="font-size: 12px; line-height: 16px"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <td class="sm-block sm-w-full">
                          <a
                            href="https://github.com/Mlika-Gaith"
                            class="sm-block sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100"
                            style="
                              text-decoration: none;
                              font-weight: 700;
                              color: #fff;
                            "
                          >
                            Github
                          </a>
                        </td>
                        <td
                          class="sm-block sm-px-0"
                          style="padding-left: 12px; padding-right: 12px"
                        >
                          <table
                            class="sm-hidden"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                class="dark-bg-gray-800"
                                style="
                                  height: 24px;
                                  width: 1px;
                                  background-color: #fff;
                                "
                              ></td>
                            </tr>
                          </table>
                        </td>
  
                        <td class="sm-block sm-w-full">
                          <a
                            href="https://www.linkedin.com/in/ghaith-mlika-305797214/"
                            class="sm-block sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100"
                            style="
                              text-decoration: none;
                              font-weight: 700;
                              color: #fff;
                            "
                          >
                            Linkedin
                          </a>
                        </td>
                        <td
                          class="sm-block sm-px-0"
                          style="padding-left: 12px; padding-right: 12px"
                        >
                          <table
                            class="sm-hidden"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                class="dark-bg-gray-800"
                                style="
                                  height: 24px;
                                  width: 1px;
                                  background-color: #fff;
                                "
                              ></td>
                            </tr>
                          </table>
                        </td>
                        <td class="sm-block sm-w-full">
                          <a
                            href="https://twitter.com/GaithMlika"
                            class="sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100"
                            style="
                              text-decoration: none;
                              display: block;
                              font-weight: 700;
                              color: #fff;
                            "
                          >
                            Twitter
                          </a>
                        </td>
                        <td
                          class="sm-block sm-px-0"
                          style="padding-left: 12px; padding-right: 12px"
                        >
                          <table
                            class="sm-hidden"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                class="dark-bg-gray-800"
                                style="
                                  height: 24px;
                                  width: 1px;
                                  background-color: #dee2e9;
                                "
                              ></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <hr
                      class="sm-mt-0 dark-bg-gray-800 dark-text-gray-800"
                      style="
                        margin-top: 12px;
                        margin-bottom: 16px;
                        height: 1px;
                        border-width: 0px;
                        background-color: #dee2e9;
                        color: #dee2e9;
                      "
                    />
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        line-height: 16px;
                        color: #fff;
                      "
                    >
                      If you have questions or need help, don't hesitate to
                      contact me via email ghaith.mlika@plytechnicien.tn.
                      <br />
                      <br />
                      I'm Ghaith Mlika, developer of the AI Prompts website a
                      recent engineering graduate with a keen interest in computer
                      science and development, based in Sousse, Tunisia
                    </p>
                    <div style="line-height: 16px">&zwnj;</div>
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        line-height: 16px;
                        color: #fff;
                      "
                    >
                      Please disregard this login email if you did not initiate a
                      login request on the AI Prompts website.
                    </p>
                    <div style="line-height: 40px">&zwnj;</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;
}

// Email Text body (fallback for email clients that don't render HTML)
function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
