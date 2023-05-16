<script src="https://unpkg.com/@shopify/app-bridge"></script>
<script>
    var AppBridge = window['app-bridge'];
    var actions = window['app-bridge'].actions;
    var createApp = AppBridge.default;

    var app = createApp({
        apiKey: '{{ env("SHOPIFY_API_KEY") }}',
        shopOrigin: '{{ ShopifyApp::shop()->shopify_domain }}',
    });
</script>
