const DONT_REGISTER = ['ocupado', 'fora do escritório', 'Recusado', 'Precisa de RSVP']; // Precisa de RSVP = agenda que não foi aceita nem recusada
const WORK_ITEM_DICTIONARY = [
    { name: 'Product', task: 264902 }
];
const ACTIVITY_TYPE_DICTIONARY = [
    { name: 'teste', activityType: 'Testing'},
    { name: '[DEV]', activityType: 'Development'},
    { name: '[Code', activityType: 'Development'},
    { name: '[Ana]', activityType: 'Analysis'},
];
const WORK_ITEM_COLOR_DICTIONARY = {
    'Take': 264900,
    'Take Interno': 264902,
    'Itau': 553234,
    'Recovery': 262718,
};

function getCalendar() {
    const gridcellRole = Array.from(document.querySelectorAll('[role="gridcell"]'));
    const presentationRole = gridcellRole.filter(child => child.querySelectorAll('[role="presentation"]')[0]);
    const days = presentationRole.slice(5);

    const daysMeetings = days.map(day => {
        const meetingsDiv = Array.from(day.lastElementChild.children);
        return meetingsDiv.map(reuniao => reuniao.children[1] && !reuniao.children[0].textContent ? reuniao.children[1].textContent : reuniao.children[0].textContent);
    });

    const daysMeetingsAccepted = daysMeetings.map(dayMeetings => dayMeetings.filter(meeting => !DONT_REGISTER.find(noMeeting => meeting.includes(noMeeting))));

    const text = daysMeetingsAccepted.map(dayMeetingsAccepted => {
        const mettings = dayMeetingsAccepted.map(meetingAccepted => {
            const meetingAcceptedSplitted = meetingAccepted.split(', ');

            const date = meetingAcceptedSplitted.find(item => /\d\sde\s\w+\sde\s\d{4}/.test(item));
            const startDate = date ? formatDates(date) : '';

            const hours = meetingAcceptedSplitted.find(item => item.includes(' - '));
            const hour = hours ? hours.split(' - ') : '';
            const startTime = formatHours(hour[0]);
            const endTime = formatHours(hour[1]);

            const comment = meetingAcceptedSplitted.find(item => /[a-z]{3}/i.test(item));
            const colorItem = meetingAcceptedSplitted.find(item => item.includes('cor: '));
            const color = colorItem ? colorItem : '';
            const workItem = formatWorkItem(color, comment);

            const activityType = getActivityType(comment);

            return `${startDate}\t${startTime}\t${endTime}\t${workItem}\t${activityType}\t${comment}\n`;
        })
        return mettings.join('');
    });

    return console.info(text.join(''));
}

function formatDates(date) {
    const monthDictionary = ["janeiro","fevereiro","marco","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
    const dd = zeroLeft(date.split(' ')[0]);
    const mm = (zeroLeft(monthDictionary.findIndex((month) => date.includes(month)) + 1));
    const aaaa = date.split(' ')[4];

    return `${mm}/${dd}/${aaaa}`;
}

function formatHours(hour) {
    const time = hour.match(/\d+/g);
    const hourNumber = Number(time[0]);
    const formatAmPmHour = hour.includes('pm') && hourNumber < 12 ? hourNumber + 12 : zeroLeft(hourNumber);
    return time.length == 1 ? `${formatAmPmHour}:00:00` : `${formatAmPmHour}:${time[1]}:00`;
}

function formatWorkItem(colorItem, comment) {
    const workItem = colorItem.replace('cor: ', '');
    let workItemInName = comment.match(/\d{6}/g);
    const hasWorkItemName = findNameInDictionary(WORK_ITEM_DICTIONARY, comment);
    if (!workItemInName) workItemInName = hasWorkItemName ? [hasWorkItemName.task] : '';
    return workItemInName ? workItemInName[0] : (WORK_ITEM_COLOR_DICTIONARY[workItem] ? WORK_ITEM_COLOR_DICTIONARY[workItem] : '');
}

function getActivityType(comment) {
    const hasActivityType = findNameInDictionary(ACTIVITY_TYPE_DICTIONARY, comment);
    const activityType = hasActivityType ? hasActivityType.activityType : 'Meetings';
    return activityType;
}

const findNameInDictionary = (dictionary, comment) => dictionary.find(workItem => comment.toLowerCase().includes(workItem.name.toLowerCase()));

const zeroLeft = (number) => number.toString().padStart(2, 0);

getCalendar();