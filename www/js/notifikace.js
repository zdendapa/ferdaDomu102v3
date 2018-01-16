function notificationSetNow()
{
    // alert("notificationNow");
    console.log("NOTIFIKACE");
    window.cordova.plugins.notification.local.schedule({
        title: 'My first notification',
        text: 'Thats pretty easy...'
    });
}

function notificationSet60()
{
    var now = new Date().getTime(),
        _60_seconds_from_now = new Date(now + 10*60*1000); // 10 minut
    window.cordova.plugins.notification.local.schedule({
        id:         0,
        title:      'Upozorneni',
        text:       'posledni objednavka do 17.00 ',
	    foreground: true,
        every:      'minute',
        firstAt:    _60_seconds_from_now
    });

    alert("notificationSet60 nastaveno");

}

function notificationSet()
{

    var dateThu = new Date(getNextThursday().getTime());
    window.cordova.plugins.notification.local.schedule({
        id:         1,
        title:      'Ferda domů!',
        message:    'posledni objednavka do 17.00',
        foreground: true,
        every:      'week',
        firstAt:    dateThu
    });

    alert("Nastaveno!");
}

// nova verze pluginu iOS 10+
function notificationSetCustomInput() {

    try {
        // jedno maze uz spustena notifikace druhe ne
        cordova.plugins.notification.local.clearAll(function() {
            console.log("Upozornění vypnuto pres clearAll");
        }, this);
        cordova.plugins.notification.local.cancelAll(function() {
            console.log("Upozornění vypnuto pres cancelAll");
        }, this);
    } catch (e) {
        console.log(e);
    }

    var t = $("input[name='cas_notifikace']").val();
    if(t.length==0)
    {
        alert("Vložte prosím čas (HH:MM)");
        return;
    }
    var thours = t.split(":")[0];
    var tmins = t.split(":")[1];
    console.log(thours);
    console.log(tmins);

    window.cordova.plugins.notification.local.schedule({
        title:      '',
        text:    'Nezapomeň objednat pivo Ferdinand dnes do 17:00 hod',
        trigger: { every: { weekday: 2, hour: parseInt(thours), minute: parseInt(tmins) } },
        foreground: true
    });
    alert("Upozornění nastaveno");
}

// starsi verze pluginu iOS < 10
function notificationSetCustomInputOriginal()
{
    var t = $("input[name='cas_notifikace']").val();
    if(t.length==0)
    {
        alert("Vložte prosím čas (HH:MM)");
        return;
    }
    var thours = t.split(":")[0];
    var tmins = t.split(":")[1];

    if(!isNaN(thours) && !isNaN(tmins))
    {
        var dateThu = new Date(getNextThursday(thours, tmins).getTime());
        window.cordova.plugins.notification.local.schedule({
            id:         1,
            title:      '',
            message:    'Nezapomeň objednat pivo Ferdinand dnes do 17:00 hod',
            foreground: true,
            // every:      'week',
            every:      'minute',
            firstAt:    dateThu
        });

        alert("Upozornění nastaveno");
    } else
    {
        alert("Vložte prosím čas (HH:MM)");
        return;
    }


}

function getNextThursday(hours, mins) {
    if(hours == null) hours = 17;
    if(mins == null) mins = 0;

    var now = new Date();
    //var now = new Date('August 30, 2014 3:57:14 pm');
    var day = now.getDay();

    // vypocet dnu (1=pondeli, 2=utery, 3=streda ...)
    diff = 2 - day;
    if(diff <0)
    {
        diff += 7;
    }
    if(diff == 0)
    {
        if(now.getHours()>=hours && now.getMinutes()>= mins)
            diff += 7;
        else
            diff = 0;
    }
    //todo zkouska
    diff = 0;
    return new Date(now.getFullYear(),now.getMonth(),now.getDate() + diff,hours,mins);
}

// v pluginu blbne mazani, tak jsem zkousil vsechnz moznosti
function notificationClear()
{
    try {
	// jedno maze uz spustena notifikace druhe ne
        cordova.plugins.notification.local.clearAll(function() {
            console.log("Upozornění vypnuto pres clearAll");
        }, this);
        cordova.plugins.notification.local.cancelAll(function() {
            console.log("Upozornění vypnuto pres cancelAll");
        }, this);
	alert("Upozornění vypnuto");
        return;
    } catch (e) {
        console.log(e);
    	alert("Notifikaci se nepodařilo zrušit.")
    }
}


function notificationTriggerSet()
{
    cordova.plugins.notification.local.on("click", function(notification) {

        if($("#CollapsiblePanel9 div.CollapsiblePanelContentM").css("display")=="none")
        {
            $("#CollapsiblePanel9 div.CollapsiblePanelTabM").click();
        }
        console.log("SCROLL");
        console.log($('#CollapsiblePanel9 div.CollapsiblePanelTabM').offset().top);
        $(window).scrollTop($('#CollapsiblePanel9 div.CollapsiblePanelTabM').offset().top);
    });
}
