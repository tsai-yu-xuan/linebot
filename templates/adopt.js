export default {
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover'
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Brown Cafe',
        weight: 'bold',
        size: 'xl'
      },
      {
        type: 'box',
        layout: 'baseline',
        margin: 'md',
        contents: [
          {
            type: 'text',
            text: '4.0',
            size: 'sm',
            color: '#999999',
            margin: 'md',
            flex: 0
          }
        ]
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '動物狀態',
                color: '#aaaaaa',
                size: 'sm',
                flex: 3
              },
              {
                type: 'text',
                text: 'Flex Tower, 7-7-4 Midori-ku, Tokyo',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '所屬收容所名稱',
                color: '#aaaaaa',
                size: 'sm',
                flex: 3
              },
              {
                type: 'text',
                text: '10:00 - 23:00',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          }
        ]
      }
    ]
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'secondary',
        height: 'sm',
        action: {
          type: 'uri',
          label: '來電詢問',
          uri: 'https://line.me/'
        }
      },
      {
        type: 'button',
        style: 'secondary',
        height: 'sm',
        action: {
          type: 'uri',
          label: '地圖',
          uri: 'https://line.me/'
        }
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [],
        margin: 'sm'
      }
    ],
    flex: 0
  }

}
