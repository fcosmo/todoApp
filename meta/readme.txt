

Top Level:
    
    classMeta:

        name: the name of this class.
            ::= <string>
        description: the description of this class.
            ::= <string>
        inherits: the super class in which this class inherits from.
            ::= <class>
        access: the access level of this class, for 0 being lowest. 
            ::= <digit>         
        since: which version this class is introduced.
            ::= <digit>
        label: the UI display label for this class.
            ::= <string>



    fieldMetas:

        name: the name of this field. for oneToMany fields add plural suffix (s).
            ::= <string>
        description: the description of this field.
            ::= <string>        
        hasMany: inidicates the field is a oneToMany relationship and what type.
            ::= "froward" | "backward" | "bidirectional"
        class: the type class of this field.
            ::= <string>
        required: is this field required.
            ::= <boolean>
        nullAllowed: is null value allowed for this field.
            ::= <boolean>       
        unique: is the value unique 
            ::= <boolean>
        default: default value of this field.
            ::= "$null" |  <digits> | <string> | "[]"
        final: is the field value final once created.
            ::= <boolean>
        access: access level of this field, for 0 being lowest.
            ::= <integer>
        since: the version this field is introdced.
            ::= <integer>
        label: the UI display label for this field.
            ::= <string>
        rank: the displaying rank of this field.
            ::= <integer> 

