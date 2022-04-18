import dayjs from 'dayjs';

document.addEventListener('click', function() {
    const hilight_str = document.getSelection().toString();
    if (hilight_str.length === 0) {
        return false;
    }

    console.log(document.title);
    console.log(document.location.href);
    console.log(document.getSelection().toString());
    console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'));
});
