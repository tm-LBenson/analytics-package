// analytics.js

// How often send data per IP
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

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

const displayConsentBanner = (onAccept) => {
  if (document.getElementById('consent-accept')) {
    return;
  }

  const banner = document.createElement('div');
  banner.innerHTML = `
    <div style="position: fixed; bottom: 0; background: #000; color: #fff; width: 100%; padding: 15px; text-align: center; z-index: 9999;">
      We use cookies to collect analytics data.
      <button id="consent-accept" style="background: #4CAF50; border: none; color: white; padding: 5px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Accept</button>
      <button id="consent-decline" style="background: #f44336; border: none; color: white; padding: 5px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Decline</button>
    </div>
  `;

  document.body.appendChild(banner);

  console.log('Displaying consent banner');
  banner.querySelector('#consent-accept').addEventListener('click', () => {
    localStorage.setItem('analytics-consent', 'accepted');
    banner.remove();
    setTimeout(() => onAccept(), 0);
  });

  banner.querySelector('#consent-decline').addEventListener('click', () => {
    localStorage.setItem('analytics-consent', 'declined');
    banner.remove();
  });
};

const checkConsent = (justAccepted = false) => {
  if (justAccepted) {
    return true;
  }
  const consent = localStorage.getItem('analytics-consent');
  return consent === 'accepted';
};

async function analytics(siteName, clientId) {
  try {
    if (!checkLastSent()) {
      return;
    }

    if (!checkConsent()) {
      displayConsentBanner(() => analytics(siteName, clientId));
      return;
    }

    const ipAddress = await getIpAddress();

    const data = {
      siteName,
      date: new Date().toISOString(),
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      deviceType: getDeviceType(),
      ipAddress,
    };

    const response = await fetch(
      'https://astro-server-z1u9.onrender.com/traffic-data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-ID': clientId,
        },
        body: JSON.stringify(data),
      },
    );
    console.log(response);
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
