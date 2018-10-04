class StringUtils {
   constructor() {
   }
   
   remove(message) {
	    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛדאבהגטיכךלםןמעףצפשתüûÑסÇח", 
		     to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
			 mapping = {};
		var ret = [];
		for(var i = 0, j = from.length; i < j; i++ )
		   mapping[ from.charAt( i ) ] = to.charAt( i );
		
		for( var i = 0, j = message.length; i < j; i++ ) {
          var c = message.charAt( i );
          if( mapping.hasOwnProperty( message.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
		}      
      return ret.join( '' );
	   
   }
}
module.exports = StringUtils;