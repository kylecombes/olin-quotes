export default `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>Olin Quotes</title>
    <script type="text/javascript">
        window.SERVER_URI = "${process.env.SERVER_URI}";
    </script>
</head>
<body>
<noscript>
    You need to enable JavaScript to run this app.
</noscript>
<div id="root"></div>
<script type="text/javascript" src="/bundle.js"></script>
</body>
</html>`;