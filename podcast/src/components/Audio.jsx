import React from 'react';

function Audio() {
  const [audiodata, setAudioData] = React.useState(null);

  React.useEffect(() => {
    console.log('Fetching audio data...');
    fetch('https://podcast-api.netlify.app/id/<ID>')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched audio data');
        setAudioData(data);
      })
      .catch((error) => {
        console.error('Error fetching audio data:', error);
      });
  }, []);

  console.log('Audio data state:', audiodata);

  return (
    <div>
      {/* Display audio data here */}
    </div>
  );
}

export default Audio;
