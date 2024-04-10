import bcrypt from 'bcrypt'

import { Administrator } from './administrator.model.js'
import { Person } from './person.model.js'
import { SalesAgent } from './salesAgent.model.js'
import { Credential } from './Credential.model.js'
import { Client } from './client.model.js'
import { Cart } from './cart.model.js'
import { Category } from './category.model.js'
import { ProductController } from '../controllers/product.controller.js'

export async function inserts () {
  const newAdmin = {
    id: 12345,
    firstName: 'Byte',
    lastName1: 'Bazaar',
    lastName2: 'Admin'
  }

  const newSalesAgent = {
    id: 54321,
    firstName: 'Byte',
    secondName: 'Bazaar',
    lastName1: 'Sales',
    lastName2: 'Agent'
  }

  const newClients = [{
    id: 11111,
    firstName: 'Isac',
    lastName1: 'Cortes',
    lastName2: 'Buitrago'
  }, {
    id: 22222,
    firstName: 'Juan',
    secondName: 'Pablo',
    lastName1: 'Adams',
    lastName2: 'Parra'
  }, {
    id: 33333,
    firstName: 'Juan',
    secondName: 'José',
    lastName1: 'Estrada',
    lastName2: 'Vélez'
  }]

  const password = await bcrypt.hash('P@ssw0rd', 12)
  const newCredentials = [{
    personId: newAdmin.id,
    email: 'admin@bytebazaar.com',
    password
  }, {
    personId: newSalesAgent.id,
    email: 'salesagent@bytebazaar.com',
    password
  }, {
    personId: newClients[0].id,
    email: 'isacortes@bytebazaar.com',
    password
  }, {
    personId: newClients[1].id,
    email: 'Juanadams@bytebazaar.com',
    password
  }, {
    personId: newClients[2].id,
    email: 'juan@bytebazaar.com',
    password
  }]

  const newPeople = [...newClients]
  newPeople.push(newAdmin, newSalesAgent)

  await Person.bulkCreate(newPeople)
  await Credential.bulkCreate(newCredentials)

  await Administrator.create({ personId: newAdmin.id })

  await SalesAgent.create({ personId: newSalesAgent.id })

  let clientsIds = newClients.map(client => {
    const { id } = client
    return { personId: id }
  })
  await Client.bulkCreate(clientsIds)

  clientsIds = clientsIds.map(client => {
    const { personId } = client
    return { clientId: personId }
  })
  await Cart.bulkCreate(clientsIds)

  const categories = [
    {
      name: 'Computer',
      description: 'Desktop applications'
    },
    {
      name: 'Smartphone',
      description: 'Mobile applications'
    },
    {
      name: 'Tablet',
      description: 'Apps supported on tablet'
    },
    {
      name: 'Productivity',
      description: 'take your productivity to the maximum with these applications'
    },
    {
      name: 'Entertainment',
      description: 'your movies, TV and music, whenever and wherever you want'
    },
    {
      name: 'Personalization',
      description: 'Create things your way, don\'t let anyone stop you'
    },
    {
      name: 'Health',
      description: 'take care of your health with these wonderful applications'
    },
    {
      name: 'Education',
      description: 'Let you be the limit, don\'t stop learning with these applications'
    },
    {
      name: 'Time Management',
      description: 'Don\'t let your time run out! install now'
    },
    {
      name: 'Design',
      description: 'install and shape your ideas'
    }
  ]

  await Category.bulkCreate(categories)

  const products = [
    {
      name: 'microsoft office',
      stock: 6,
      price: 119.99,
      description: 'Microsoft Office is a suite of applications designed to help with productivity and completing common tasks on a computer. You can create and edit documents containing text and images, work with data in spreadsheets and databases, and create presentations and posters.',
      specs: '- Applications:\n\tMicrosoft Office typically includes several applications, such as:\n\t- Microsoft Word: A word processing program used for creating documents.\n\t- Microsoft Excel: A spreadsheet program for organizing, analyzing, and visualizing data.\n\t- Microsoft PowerPoint: A presentation program for creating slideshows.\n\t- Microsoft Outlook: An email client and personal information manager.\n\t- Microsoft Access: A database management system.\n\t- Microsoft OneNote: A note- taking application.\n\t- Microsoft Publisher: A desktop publishing program.\n\t- Microsoft Teams: Collaboration software for teams, including chat, video meetings, and file sharing.\n\t- Microsoft OneDrive: Cloud storage service for storing and sharing files.\n\t\n- Compatibility:\n\tMicrosoft Office is compatible with various operating systems, including Windows, macOS, iOS, and Android.\n\t\n- Integration:\n\tMicrosoft Office applications often integrate with each other, allowing users to easily transfer data and content between different programs. For example, you can embed an Excel spreadsheet in a Word document or import data from Outlook into Excel.\n\t\n- Cloud Integration:\n\tMicrosoft Office offers cloud integration through services like OneDrive and SharePoint, allowing users to access their files and collaborate with others from any device with an internet connection.\n\t\n- Customization:\n\tUsers can often customize the appearance and functionality of Microsoft Office applications to suit their preferences and workflow.',
      image: 'https://seeklogo.com/images/M/microsoft-office-logo-8B0EF31E09-seeklogo.com.png',
      status: true,
      provider: 'Microsoft',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Productivity',
        'Time Management',
        'Personalization'
      ]
    },
    {
      name: 'adobe photoshop',
      stock: 10,
      price: 69.99,
      description: 'With Adobe Photoshop you can design, create, and edit photos as your imagination commands.',
      specs: 'wwwwwwwwwwwww: fvjohdg\n\n-jjjjjjjjjjjjj: odfvhidfb\n\n-ttttttttt: ofhvijv',
      image: 'https://w7.pngwing.com/pngs/301/722/png-transparent-adobe-logo-logos-photoshop-logos-and-brands-icon-thumbnail.png',
      status: true,
      provider: 'Adobe',
      categories: [
        'Computer',
        'Design',
        'Personalization'
      ]
    },
    {
      name: 'zoom',
      stock: 12,
      price: 0,
      description: `Start or join a secure meeting with flawless video and audio, instant screen sharing, and cross-platform instant messaging - for free! 

      It's super easy! Install the free Zoom app, click on ""New Meeting,"" and invite up to 100 people to join you on video. Connect with anyone on Windows, Mac, mobile devices, Zoom Rooms, H.323/SIP room systems, and telephones.
      
      VIDEO MEETINGS FROM ANYWHERE
      -Best video meeting quality
      -Easily join a meeting or start an instant meeting with phone, email, or company contacts
      
      UNLIMITED MESSAGING (WITH PHOTOS, FILES, AND MORE)
      -Reach people instantly to easily send messages, files, images, links, and gifs
      -Quickly respond or react to threaded conversations with emojis
      -Create or join public and private chat channels
      `,
      specs: `MAKE, RECEIVE, AND MANAGE PHONE CALLS
      -Effortlessly make or receive calls with your business number
      -Get voicemail and call recording with transcripts
      -Use call delegation to make/receive calls on behalf of others
      -Setup auto-receptionists to autonomously answer and route calls
      
      ZOOM LICENSE INFORMATION:
      -Any free or paid license can be used with the app
      -Zoom Phone is an add-on to paid Zoom licenses
      -A paid Zoom subscription is required for certain product features
      
      Follow us on social @zoom!
      `,
      image: 'https://static.vecteezy.com/system/resources/previews/012/871/376/non_2x/zoom-logo-in-blue-colors-meetings-app-logotype-illustration-free-png.png',
      status: true,
      provider: 'Zoom',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Design',
        'Personalization',
        'Productivity',
        'Education',
        'Entertainment'
      ]
    },
    {
      name: 'nebo',
      stock: 2,
      price: 10.0,
      description: `Develop ideas and take free-form notes by combining handwriting, text, drawings, diagrams, and images on a zoomable canvas. Erase and modify content using pen gestures and convert handwriting and shapes into perfect typographic text and shapes.

      Nebo understands any word in 66 languages and works across platforms, so you can access your notes and search from any device.
      
      Enjoy 3 experiences in the same application:
      
      ** Freely create a Nebo Note  the world's most advanced freeform canvas, with full writing and shape conversion **
      **Handwrite a Nebo Adaptive Document, adding math objects and diagrams as needed**
      **Import existing files as PDF, ready to add annotations**
      
      Now with *Dark Mode* and *Apple Silicon* support  download and use Nebo on M1 and M2 Macs!
      
      `,
      specs: ` Edit with pencil:
      - Use intuitive gestures to make changes and format content without interruptions.
      - Create titles, lists and boxes, add or remove spaces and line breaks, and delete and highlight text.
      - Use the marker to highlight or color, the lasso to select, and the eraser to delete entire strokes or precisely defined content.
       
      • Write and draw freely on a Nebo Note:
      - Enjoy an infinite canvas ideal for brainstorming and free-form note taking.
      - Scroll the page and zoom in or out for a different perspective.
      - Use the lasso to select, move, copy, delete or resize content, and to convert handwritten text to typography.
       
      • Switch to a Nebo Document for an interactive experience:
      - Create and edit structured notes: your handwriting will automatically be redistributed as needed.
      - Make changes, adjust the layout, rotate the device or split the screen without having to worry about readability.
      `,
      image: 'https://play-lh.googleusercontent.com/Fez6enFPEFbs7VtQCfrGEBRF9RRR49V4-Wo4ezmLINHVfbVQ2BUxQ7yo_8Q-GV2jPf4',
      status: true,
      provider: 'Nebo',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Design',
        'Personalization',
        'Productivity',
        'Education',
        'Entertainment',
        'Time Management'
      ]
    },
    {
      name: 'one calendar',
      stock: 50,
      price: 6.0,
      description: `The most popular app to view all your calendars like Google, Live, Outlook, iCloud, Exchange, Office365, Yahoo, Nextcloud, Synology, GMX, Mailbox.org, ownCloud and more. OneCalendar integrates all your calendars into one easy and clear app . View and manage all your appointments, events and birthdays.

      Use the free version with all basic features or go for Premium.
      
      Free:
      - Manage and share appointments
      - Unlimited accounts
      - All calendar providers
      - Recurrence configuration
      - View birthdays
      - Notifications
      - Invite people
      - Work offline
      - List view, day, week, month and year
      - Integration with a task
      - Quotes on lock screen
      - Ad free
      
      `,
      specs: ` Premium (in-app purchase):
      - Appointment and calendar colors.
      - Multiple years of history.
      - Immediate synchronization
      - Theming
      - Appointment search
      - Impression
      - Route and navigation
      - Favorite emojis.
      `,
      image: 'https://store-images.s-microsoft.com/image/apps.65511.9007199266538018.1e764430-b76b-4a98-8cb5-f7b2b1c43bda.a513d4ee-85e3-44de-b9cc-b95dc9ebe7a8',
      status: true,
      provider: 'Google',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Design',
        'Personalization',
        'Productivity',
        'Education',
        'Entertainment',
        'Time Management'
      ]
    },
    {
      name: 'brave browser',
      stock: 50,
      price: 6.0,
      description: `Brave Browser is a lightning fast, safe and private web browser that prevents you from being tracked and blocks ads by default (including YouTube ads).

      Quickly import bookmarks, extensions, even saved passwords. It is the best of your old browser, only safer. And it only takes a minute to switch and ditch Big Tech.
            
      Brave Search
      Search the internet without being tracked by advertisers, malware and pop-ups.Totally private, and built off an independent search index, Brave Search is the real alternative to Google. `,
      specs: ` Privacy Protection
      Be protected with leading privacy and security features such as , script blocking, cookie blocking, and private incognito tabs. All other browsers fall short of the level of privacy and security protection that Brave provides.
      
      Brave Talk
      Unlimited, private video calls, right in your browser. No extra apps. No tracking. Just free connections, powered by Brave.
      
      Brave Wallet
      A secure, multi-chain and self-custody crypto wallet built directly into Brave browser. No extensions required. You can use it to buy, store, swap, and manage your tokens, send and receive NFTs, view market data, and much more.
      
      Brave News
      Brave News creates a customizable, up-to-date news feed, curated from a list of sources you have selected. Hundreds of top publishers and RSS feeds, blogs, news outlets, print and web magazines, and more, across dozens of categories.
      `,
      image: 'https://i0.wp.com/www.ubuntudocs.com/wp-content/uploads/2020/06/brave_icon_512x_twitter.png?fit=512%2C512&ssl=1',
      status: true,
      provider: 'Brave',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Design',
        'Personalization',
        'Productivity',
        'Education',
        'Entertainment',
        'Time Management'
      ]
    },
    {
      name: 'one note',
      stock: 50,
      price: 6.0,
      description: `OneNote is your digital notebook for capturing and organizing everything across your devices. Jot down your ideas, keep track of classroom and meeting notes, clip from the web, or make a to-do list, as well as draw and sketch your ideas. OneNote is the place for all of your notes!

      TYPE, WRITE, AND DRAW
      • Write anywhere on the page and unleash your imagination
      • Use your device's pen or your finger to write and draw with multiple types of pens and highlighters
      • Take notes on a blank background, or add a grid or ruled lines for easier drawing and writing
      
      CAPTURE ANYTHING
      • Quickly take a note by clicking the Quick Note button in the system tray and on supported pens*
      • Add images, audios, videos, and documents to your note, and save websites, recipes, documents and more to OneNote using Web Clipper 
      • Search and find anything in your notes, including handwritten ink and text in pictures
      
      
      `,
      specs: ` MADE FOR TEAMWORK
      • Easily share your notebooks with colleagues, family, and friends
      • Plan vacations, share meeting minutes or lecture notes with people around you
      • Collaborate and edit notes together, and clearly see where the changes are made
      
      ALWAYS WITH YOU
      • Your notes travel with you whether you're at home, in the office, or on the go
      • Store your notebooks locally or in the cloud. Have the latest on all your devices when they are saved and synced in the cloud
      • Your notebooks look familiar on all your devices, so you can pick up where you left off on your desktop, tablet, or mobile device
      
      If you want to get early access to the latest features and help us evaluate them, you can join the Office Insider program. Check out the details at insider.office.com.
      `,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Microsoft_Office_OneNote_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_OneNote_%282019%E2%80%93present%29.svg.png',
      status: true,
      provider: 'Microsoft Corporation',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Design',
        'Personalization',
        'Productivity',
        'Education',
        'Entertainment',
        'Time Management'
      ]
    },
    {
      name: 'ever note',
      stock: 50,
      price: 6.0,
      description: `Capture ideas when inspiration strikes. Bring your notes, to-dos, and schedule together to tame life’s distractions and accomplish more—at work, at home, and everywhere in between. 

      Evernote syncs to all your devices, so you can stay productive on the go. Tackle your to-do list with Tasks, connect your Google Calendar to stay on top of your schedule, and see your most relevant information quickly with a customizable Home dashboard. 
      
      ---
      
      “Use Evernote as the place you put everything… Don’t ask yourself which device it’s on—it’s in Evernote” – The New York Times
      
      “When it comes to taking all manner of notes and getting work done, Evernote is an indispensable tool.” – PC Mag
      
      ---
      
      CAPTURE IDEAS
      • Write, collect, and capture ideas as searchable notes, notebooks, and to-do lists.
      • Clip interesting articles and web pages to read or use later. 
      • Add different types of content to your notes: text, docs, PDFs, sketches, photos, audio, web clippings, and more.
      • Use your camera to scan and organize paper documents, business cards, whiteboards, and handwritten notes.
      
      `,
      specs: ` GET ORGANIZED
      • Manage your to-do list with Tasks—set due dates and reminders, so you never miss a deadline.
      • Connect Evernote and Google Calendar to bring your schedule and your notes together.
      • See your most relevant information instantly on the Home dashboard.
      • Create separate notebooks to organize receipts, bills, and invoices.
      • Find anything fast—Evernote's powerful search can even find text in images and handwritten notes.
      `,
      image: 'https://cdn-icons-png.flaticon.com/512/4494/4494685.png',
      status: true,
      provider: 'Evernote',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Design',
        'Personalization',
        'Productivity',
        'Education',
        'Entertainment',
        'Time Management'
      ]
    }
  ]

  const productController = new ProductController()
  products.forEach(prod => {
    productController.createProduct({ body: prod }, {
      status (code) {
        return this
      },
      json (data) {
        console.log('Response: product created')
      }
    })
  })
}
