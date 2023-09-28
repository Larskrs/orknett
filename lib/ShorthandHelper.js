

export function GetShortHandle ( string ) {
    let first
    let last
    if ( string.split(' ').length > 1) {
        first = GetShortHandle(string.split(' ')[0]).first
        last  = GetShortHandle(string.split(' ')[1]).last
    } else {
        first = string.split('')[0]
        last = string.split('').pop()
    }
    return {first, last, combined: first+last}
}
