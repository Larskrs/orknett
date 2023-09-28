

export function GetShortHandle ( string ) {
    let first
    let last
    if ( string.split(' ').length > 1) {
        first = GetShortHandle(string.split(' ')[0]).first
        last  = GetShortHandle(string.split(' ').pop()).last
    } else {
        first = string.split('')[0]
        last = string.split('')[0]
    }
    return {first, last, combined: first+last}
}
