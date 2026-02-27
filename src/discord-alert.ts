
export const send_to_discord = async (message: string) => {
     const webhook = process.env.DISCORD_WEBHOOK as string

     if (!webhook) {
          console.log("No webhook found")
          return
     }

     const full_message = {
          username: 'Elrecord System',
          avatar_url: `${process.env.API_ENDPOINT_URL}/Bug.jpeg`,
          embeds: [
               {
                    title: '🚨 URGENT: Server Issue',
                    color: 0xff0000,
                    fields: [
                         { name: 'Message', value: message, inline: true },
                    ],
                    footer: { text: 'Manual action required immediately' }
               }
          ]
     };
     try {
          const response = await fetch(webhook, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(full_message),
          })

          if (!response.ok) {
               console.log("Failed to send to discord")
          }
     }
     catch (err) {
          console.log("Failed to send to discord")
     }
}
