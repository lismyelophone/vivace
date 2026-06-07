// Firebase Service Worker для push-уведомлений
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAr0-rgDAwt5cZUrygUIUsWm9IcuD-UBOI",
  authDomain: "vivace-bdd23.firebaseapp.com",
  projectId: "vivace-bdd23",
  storageBucket: "vivace-bdd23.firebasestorage.app",
  messagingSenderId: "606429133922",
  appId: "1:606429133922:web:c9861ea23743bb4d8fa53b"
});

const messaging = firebase.messaging();

// Обработка фоновых уведомлений
messaging.onBackgroundMessage((payload) => {
  console.log('Фоновое уведомление:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title || 'Виваче', {
    body: body || '',
    icon: icon || '/logo.jpg',
    badge: '/logo.jpg',
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [
      { action: 'open', title: 'Открыть' }
    ]
  });
});

// Клик по уведомлению — открыть сайт
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
