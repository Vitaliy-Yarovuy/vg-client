import React, { Component } from 'react';

export default class AboutPage extends Component {
  render() {
    return (
      <div className='About'>
        <h2>About</h2>
        <hr />
        <h3>Virus war</h3>
        <ul>
          <li><a target='_blank' href='http://smart-kids.su/igry/na-bumage/voyna-virusov'>smart-kids</a></li>
          <li><a target='_blank' href='https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B9%D0%BD%D0%B0_%D0%B2%D0%B8%D1%80%D1%83%D1%81%D0%BE%D0%B2'>wiki</a></li>
          <li><a target='_blank' href='http://masterok.livejournal.com/805315.html'>22->13</a></li>
          <li><a target='_blank' href='http://thejam.ru/igry-na-bumage/vojna-virusov-klopy-vojna.html'>the jam</a></li>
          <li><a target='_blank' href='https://metaschool.ru/pub/games/viruswar/viruswar.php'>meta school</a></li>
        </ul>
      </div>
    );
  }
}
