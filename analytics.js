// analytics.js

// How often send data per IP
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
const SERVER = 'https://astro-server-z1u9.onrender.com/traffic-data';
const checkLastSent = () => {
  const lastSent = localStorage.getItem('lastSent');
  if (!lastSent) {
    return true;
  }

  const currentTime = new Date().getTime();
  const lastSentTime = new Date(lastSent).getTime();
  return currentTime - lastSentTime > ONE_HOUR;
};

const updateLastSent = () => {
  localStorage.setItem('lastSent', new Date().toISOString());
};

const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  ) {
    return 'mobile';
  } else if (/iPad/i.test(userAgent)) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const getIpAddress = async () =>
  await fetch('https://api.ipify.org?format=json')
    .then((res) => res.json())
    .then((data) => data.ip);

// Display Consent Banner

const displayConsentBanner = (onAccept, siteName, clientId) => {
  if (document.getElementById('consent-accept')) {
    return;
  }
  const consent = localStorage.getItem('analytics-consent');

  if (consent === 'declined') {
    return;
  }

  const banner = document.createElement('div');
  banner.innerHTML = `
  <div style="position: fixed; bottom: 0; background: #000; color: #fff; width: 100%; padding: 15px; text-align: center; z-index: 9999;">
  Our website uses cookies to analyze traffic and personalize your experience.<br>
  <span style="font-size: 12px;">We only collect basic information such as device type and screen size to help us optimize your experience on our site. We do not collect personally identifiable information.</span>
  <button id="consent-accept" style="background: #4CAF50; border: none; color: white; padding: 5px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Accept</button>
  <button id="consent-decline" style="background: #f44336; border: none; color: white; padding: 5px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Decline</button>
</div>
  `;

  document.body.appendChild(banner);

  banner.querySelector('#consent-accept').addEventListener('click', () => {
    localStorage.setItem('analytics-consent', 'accepted');
    banner.remove();
    setTimeout(() => onAccept(), 0);
  });

  banner
    .querySelector('#consent-decline')
    .addEventListener('click', async () => {
      localStorage.setItem('analytics-consent', 'declined');
      banner.remove();

      const data = {
        siteName,
        date: new Date().toISOString(),
        noConsent: true,
      };

      try {
        const response = await fetch(SERVER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Client-ID': clientId,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(
            `Error sending data to the server: ${response.statusText}`,
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
};

const checkConsent = (justAccepted = false) => {
  if (justAccepted) {
    return true;
  }
  const consent = localStorage.getItem('analytics-consent');
  return consent === 'accepted';
};
const getLocationData = async (ipAddress) => {
  try {
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    const data = await response.json();

    return {
      country: data.country_name,
      region: data.region,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error('Error getting location data: ', error);
    return null;
  }
};

async function analytics(siteName, clientId) {
  try {
    if (!checkLastSent()) {
      return;
    }

    if (!checkConsent()) {
      displayConsentBanner(
        () => analytics(siteName, clientId),
        siteName,
        clientId,
      );
      return;
    }

    const ipAddress = await getIpAddress();
    const location = await getLocationData(ipAddress);

    const data = {
      siteName,
      date: new Date().toISOString(),
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      deviceType: getDeviceType(),
      location,
    };

    const response = await fetch(SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-ID': clientId,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Error sending data to the server: ${response.statusText}`,
      );
    }

    updateLastSent();
  } catch (error) {
    console.error(error);
  }
}

if (typeof module !== 'undefined') {
  module.exports = analytics;
}
if (typeof window !== 'undefined') {
  window.analytics = analytics;
}
