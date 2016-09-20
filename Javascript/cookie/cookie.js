var CookieUtil = {
    get: function (name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toGMTString();
        }
        if (path) {
            cookieText += '; path=' + path;
        }
        if (domain) {
            cookieText += '; domain=' + domain;
        }
        if (secure) {
            cookieText += '; secure';
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure);
    }
};

var SubCookieUtil = {
    get: function (name, subName) {
        var subCookies = this.getAll(name);
        if (subCookies) {
            return subCookies[subName];
        } else {
            return null;
        }
    },
    getAll: function (name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            parts,
            result = {};

        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));

            if (cookieValue.length > 0) {
                subCookies = cookieValue.split('&');
                for (var i = 0, len = subCookies.length; i < len; i++) {
                    parts = subCookies[i].split('=');
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }
        }
        return null;
    },
    set: function (name, subName, value, expires, path, domain, secure) {
        var subCookies = this.getAll(name) || {};
        subCookies[subName] = value;
        this.setAll(name, subCookies, expires, path, domain, secure);
    },
    setAll: function (name, subcookies, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=',
            subCookieParts = [],
            subName;

        for (subName in subcookies) {
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
                subCookieParts.push(encodeURIComponent(subName) + '=' + encodeURIComponent(subcookies[subName]));
            }
        }

        if (subCookieParts.length > 0) {
            cookieText += subCookieParts.join('&');

            if (expires instanceof Date) {
                cookieText += '; expires=' + expires.toGMTString();
            }
            if (path) {
                cookieText += '; path=' + path;
            }
            if (domain) {
                cookieText += '; domain=' + domain;
            }
            if (secure) {
                cookieText += '; secure';
            }
        } else {
            cookieText += '; expires=' + (new Date(0)).toGMTString();
        }
        document.cookie = cookieText;
    },
    unset: function (name, subName, path, domain, secure) {
        var subCookies = this.getAll(name);
        if (subCookies) {
            delete subCookies[subName];
            this.setAll(name, subCookies, null, path, domain, secure);
        }
    },
    unsetAll: function (name, path, domain, secure) {
        this.setAll(name, null, new Date(0), path, domain, secure);
    }
};
