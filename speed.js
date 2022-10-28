function adjustspeed (speeds)
{
    if ( speeds == "slow" )
    {
        speed = 0;
    } else if ( speeds == "medium" )
    {
        speed = 1;
    } else
    {
        speed = 2;
    }
    document.getElementsByClassName( "speeder" )[0].textContent = speeds;
}
