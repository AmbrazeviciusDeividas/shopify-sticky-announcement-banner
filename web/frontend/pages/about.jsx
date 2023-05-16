import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

export default function About() {
  return (
      <Page
          breadcrumbs={[{content: 'Home', url: '/'}]}
          title="About"
          divider
      >
          <LegacyCard title="About Sticky Announcement Banner" sectioned>
              <strong>
                  🚀 Welcome to Sticky Announcement Banner APP! 🚀
              </strong>
              <br/><br/>
              <p>🎉 Sticky Announce Bar is a cutting-edge Shopify app designed to help you create eye-catching, customizable sticky announcement banners for your online store. With our easy-to-use interface, you'll boost your conversions, promote special offers, and engage your customers like never before! 🛍️</p>
              <br/><br/>
              <strong>🎯 Key Features 🎯</strong>
              <ul>
                  <li>🔧 Easy Customization: Personalize your announcement bar with a wide range of colors, fonts, and styles to perfectly match your store's theme. 🎨</li>
                  <li>📱 Mobile Responsive: Sticky Announce Pro is built to look great and function seamlessly on all devices, ensuring a fantastic experience for your customers. 📲</li>
                  <li>⏰ Schedule & Automate: Schedule your announcement bars ahead of time or set them to display automatically based on specific triggers, such as holidays or flash sales. 🗓️</li>
                  <li>💡 Smart Targeting: Target specific customer groups, locations, or pages on your website for maximum impact. 🌎</li>
                  <li>📈 Analytics & Insights: Monitor your announcement bars' performance with detailed analytics, helping you fine-tune your strategy for better results. 📊</li>
              </ul>
              <br/><br/>
              <strong>🌟 Get Started Today! 🌟</strong>
              <br/><br/>
              <p>Unlock the full potential of your online store with Sticky Announce Pro. Don't miss out on the chance to increase your store's visibility, drive more sales, and create an unforgettable shopping experience for your customers. Try Sticky Announce Pro now and watch your business soar! 🚀</p>
              <br/><br/>
              <p>💡 Need help or have questions? Our dedicated support team is here to assist you. Just reach out to us at support@stickyannouncepro.com or visit our Help Center. 💌</p>
          </LegacyCard>
      </Page>
  );
}
