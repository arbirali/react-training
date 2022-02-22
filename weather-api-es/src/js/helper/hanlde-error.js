import $ from 'jquery';

export default function handleError({response}) {
    let { message } = JSON.parse(response.request.responseText);

    $('#notFound').text(message).show();
    $('#weatherDetails').hide();
}
