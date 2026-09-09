const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

export const initAnalytics = () => {
  // Initialize GA4 if ID exists
  if (GA_MEASUREMENT_ID) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  } else {
    console.log("GA4 is disabled (VITE_GA_MEASUREMENT_ID not set)");
  }

  // Initialize Meta Pixel if ID exists
  if (META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
  } else {
    console.log("Meta Pixel is disabled (VITE_META_PIXEL_ID not set)");
  }
};

export const trackPageView = (path) => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const trackViewProducts = () => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'view_products');
  }
};

export const trackViewItem = (product) => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'select_product', {
      product_id: product.id,
      product_name: product.name,
      value: product.price,
      currency: product.currency
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency
    });
  }
};

export const trackBeginCheckout = (product) => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      product_id: product.id,
      product_name: product.name,
      value: product.price,
      currency: product.currency
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency
    });
  }
};

export const trackPurchase = (orderId, product) => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      product_id: product.id,
      product_name: product.name,
      value: product.price,
      currency: product.currency
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'Purchase', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: product.currency
    });
  }
};
