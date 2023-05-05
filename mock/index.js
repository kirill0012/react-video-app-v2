const express = require('express')
var cors = require('cors')
var cookie = require('cookie')
const app = express()
const port = 8000

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders:
      'Origin, X-Refresh-Token, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  })
)
app.use(express.json())

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  if (email == 'mor@innplaylabs.com' && password == 'AB12345678') {
    res.json({
      id: 1,
      name: 'John Doe',
      avatar: '/demo/Image.png',
      access_token: 'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb',
      refresh_token: '111',
    })
  } else {
    res.status(403).json({
      message: 'Invalid username or password',
    })
  }
})

app.get('/auth/me', (req, res) => {
  const { access_token } = cookie.parse(req.headers.cookie)
  if (access_token == 'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb') {
    res.json({
      id: 1,
      name: 'John Doe',
      avatar: '/demo/Image.png',
    })
  } else {
    res.status(403).json({
      message: 'Not authorized',
    })
  }
})

app.get('/user/profile', (req, res) => {
  const { access_token } = cookie.parse(req.headers.cookie)
  if (access_token == 'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb') {
    res.json({
      project: {
        title: 'Animal Kingdom',
        avatar: '/demo/image 14.png',
      },
      generation_limits: {
        concept: 1,
        iterations: 2,
      },
    })
  } else {
    res.status(403).json({
      message: 'Not authorized',
    })
  }
})

app.post('/concepts/get_ad_summary', (req, res) => {
  const { access_token } = cookie.parse(req.headers.cookie)
  if (access_token == 'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb') {
    res.json({
      title: 'Mushroom Kingdom Adventure',
      summary:
        'The casual mobile game ad showcases a thrilling gameplay scenario where a bear character builds bridges and travels across floating mushroom-themed platforms while collecting whimsical prizes. The ad emphasizes the feeling of excitement and fun despite the bears occasional falling. A lively Mushroom Wonderland soundtrack plays in the background, accompanied by a captivating commentary narrated by SAM, highlighting the gameplays successes and fail moments. The ad uniquely focuses on a visually engaging, Mushroom Forest theme that doesnt exist in the game.',
      game_mechanics:
        'Navigate a bear across mushroom-themed platforms by building bridges, collecting prizes, and avoiding occasional falls in this back-view platformer game.',
      assets_agent_input: {
        logo: [
          {
            path: 'animal_kingdom/gameplays/logo.png',
            field_type: 's3_asset',
          },
        ],
        end_card: [
          {
            path: 'animal_kingdom/gameplays/end_card.mp4',
            field_type: 's3_asset',
          },
        ],
        commentary: [
          {
            value:
              '0.0 "Skating through life, like this bear!";3.2 "Balancing on bridges & boards my vibe.";6.4 "Collecting those shroom prizes, score!";9.6 "Close calls make skating thrilling too.";12.8 "Mastered kickflips, now mastering bridges.";16.0 "One platform at a time, chillin.";19 "*.*A rad game for breaks between rides.";22 "*. *";4 "Chase thrills both virtual & real-life";25 "*. * Skate and play games with friends."',
            field_type: 'markup',
          },
        ],
        gameplay_rgb: [
          {
            path: 'animal_kingdom/gameplays/bear_mushrooms_rgb.mp4',
            field_type: 's3_asset',
          },
        ],
        project_name: ['animal_kingdom'],
        gameplay_alpha: [
          {
            path: 'animal_kingdom/gameplays/bear_mushrooms_alpha.mp4',
            field_type: 's3_asset',
          },
        ],
        'main_section_image_#1': [
          {
            field_type: 'image',
            description:
              'A simple and clean background image, Whimsical mushroom forest, vibrant colors, dreamy atmosphere theme,  realistic photograph background,drone shot, --no title, drone, animals, bridges, text --v 5 --q 2 --ar 4:5',
          },
        ],
        'general_sound_track_#1': [
          {
            bpmMin: 140,
            field_type: 'sound_track',
            search_term: 'Mushroom Wonderland Music',
          },
        ],
        'generated_vfx_video_#1': [
          {
            value: 'vfx_library/fail_1280x1280.mov',
            field_type: 'markup',
          },
        ],
        'generated_commentary_VO#1': [
          {
            text: 'Skating through life, like this bear!',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#2': [
          {
            text: 'Balancing on bridges & boards my vibe.',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#3': [
          {
            text: 'Collecting those shroom prizes, score!',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#4': [
          {
            text: 'Close calls make skating thrilling too.',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#5': [
          {
            text: 'Mastered kickflips, now mastering bridges.',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#6': [
          {
            text: 'One platform at a time, chillin.',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#7': [
          {
            text: '*.*A rad game for breaks between rides.',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#8': [
          {
            text: '*. *',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_commentary_VO#9': [
          {
            text: 'Chase thrills both virtual & real-life',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
        'generated_vfx_in_point_#1': [
          {
            value: '27.0',
            field_type: 'markup',
          },
        ],
        'generated_commentary_VO#10': [
          {
            text: '*. * Skate and play games with friends.',
            narrator: 'SAM',
            field_type: 'text',
            narrator_provider: 'elevenlabs',
          },
        ],
      },
      prompt_engine_configuration: {
        theme: null,
        game_name: 'animal_kingdom',
        atmosphere: 'playful, humorous',
        game_genre: 'social, hyper-casual',
        include_timer: false,
        commentary_type: 'non_reactive',
        target_audience: 'youth',
        user_motivation: 'success',
        include_attaboys: false,
        include_commentary: true,
        gameplay_definitions: {
          game_name: 'animal_kingdom',
          video_length: 29,
          default_theme: 'A commercial for a game called animal kingdom that represents <blank>',
          logo_location: 'animal_kingdom/gameplays/logo.png',
          game_description:
            'Play with millions of players around the globe in this addictive animal adventure game. Build islands and bridges, raid lands, and collect treasure island coins!',
          gameplay_outcome: 'fail',
          gameplay_tagging:
            "\nTime;Comment;Outcome;Impact\n0.0;a bear is standing on a floating mushroom-shaped platform, building a bridge towards the next platform\n1.66666666666667;the bridge is complete, start shuffling a prize on the next platform\n2.86666666666667;the shuffle stops on a mushroom collectible prize. coins appear across the bridge. The bear starts crossing, collecting the prizes.\n4.06666666666667;the bear makes it across the bridge and collects the mushroom prize, causing a coin burst. the coins have a mushroom icon on them as well.\n4.3;start building a bridge to the next platform\n5.86666666666667;the bridge is complete, but it's too short. the bear starts crossing\n7.4;the bridge collapses, the bear looks back in alarm\n7.73333333333333;the bear falls\n8.6;the bear revives on the previous platform\n9.23333333333333;start building a bridge to the next platform\n11.2333333333333;the bridge is complete, start shuffling a prize on the next platform\n12.4666666666667;the shuffle stops on a mushroom collectible prize. coins appear across the bridge. The bear starts crossing, collecting the prizes.\n14.1666666666667;the bear makes it across and collects the mushroom prize\n15.3333333333333;start building a bridge to the next platform\n16.9666666666667;the bridge is complete, start shuffling a reward on the next platform\n18;the shuffle stops on a mushroom collectible prize. coins appear across the bridge. The bear starts crossing, collecting the prizes.\n18.9666666666667;the bear makes it across and collects the mushroom prize\n20.0666666666667;start building a bridge to the next platform\n21.5333333333333;the bridge is complete, start shuffling a prize on the next platform\n22.7;the shuffle stops on a mushroom collectible prize. coins appear across the bridge. The bear starts crossing, collecting the prizes.\n23.6666666666667;the bear makes it across and collects the mushroom prize\n24.9666666666667;start building a bridge to the next platform\n26.1;the bridge is too short but the bear starts crossing anyway\n26.6333333333333;the bridge tiles behind the bear are collapsing\n27.3;the bear looks back in alarm and falls down. this is a fail moment.\n    ",
          camera_view_style: 'drone shot',
          end_card_location: 'animal_kingdom/gameplays/end_card.mp4',
          gameplay_location: 'animal_kingdom/gameplays/gameplay.mp4',
          gameplay_meta_tagging:
            '\nCharacter: bear\nPlatform skin: mushrooms\nGame mechanic: platforms\nCamera angle: back view\nWin/fail: fail\nFlow: A bear character is building bridges and traveling between mushroom-themed platforms, collecting prizes and occasionally falling. \n    ',
          gameplay_rgb_location: 'animal_kingdom/gameplays/bear_mushrooms_rgb.mp4',
          gameplay_alpha_location: 'animal_kingdom/gameplays/bear_mushrooms_alpha.mp4',
          gameplay_tagging_summary:
            '\nIn this gameplay segment, the player controls a giraffe as it crosses wooden bridges between hovering platforms, collecting coins along the way. The player builds bridges to new platforms, with each completed bridge followed by a prize shuffle that awards various rewards, including coins and steal opportunities. A bear appears on a platform, and the player attempts to steal from it using a 3x3 grid of cards, but ultimately fails when they reveal a bomb. The bear remains unscathed as the bomb explodes, ending the gameplay sequence.  \n    ',
        },
        template_definitions: [
          {
            scene: 'main_section',
            assets: ['image'],
          },
          {
            scene: 'general',
            assets: ['sound_track'],
          },
        ],
        background_art_prefixes:
          'A simple and clean background image,A realistic photograph background image',
        background_art_suffixes:
          'cartoon style up in the sky background,realistic photograph background,realistic style',
        use_branded_music_sound: false,
        include_reactionary_overlay: false,
        include_talking_avatar_overlay: false,
        background_reference_image_path: null,
        background_image_negative_prompts: '--no title, drone, animals, bridges, text',
        background_reference_image_weight: 1.25,
      },
    })
  } else {
    res.status(403).json({
      message: 'Not authorized',
    })
  }
})

app.post('/auth/logout', (req, res) => {
  const { email, password } = req.body
  res.json({ message: 'success' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
