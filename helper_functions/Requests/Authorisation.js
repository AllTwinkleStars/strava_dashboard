const fetchAccessToken = async (authorizationCode) => {

  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;

  const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      grant_type: 'authorization_code',
    }),
  });

  if (response.ok) {
    const { access_token } = await response.json();
    return access_token;
  } else {
    throw new Error('Error exchanging authorization code for access token');
  }
};

export default async function StravaAuthorisation() {
  const fetchToken = async () => {
    const authorizationCode = window.location.search.split('code=')[1];
    if (authorizationCode) {
      const authorizationCodeSplit = authorizationCode.split('&')[0];
      if (authorizationCodeSplit) {
        try {
          const token = await fetchAccessToken(authorizationCodeSplit);
          return token;
        } catch (error) {
          console.error('Error fetching access token from Strava:', error);
        }
      }
    }
  };

  const accessToken = await fetchToken();
  return accessToken;
}

