Top Level:
    
    entityMeta:

        name: the name of this entity. Capitalized with CamelCase. 
            ::= <string>
        description: the description of this class.
            ::= <string>
        inherits: the super class in which this class inherits from.
            ::= <class>
        access: the access level of this class, for 0 being lowest. 
            ::= <digit>         
        since: which version at which this class is introduced. 
            ::= <digit>
        label: the UI display label for this class.
            ::= <string>
        abstract: indicate the class is abstract. i.e. super/abstract/primitive classes.
            ::= <boolean>


    fieldMetas:

        name: the name of this field. Lowercase with CamelCase. Append suffix "List" for hasMany relation fields
            ::= <string>
        description: the description of this field.
            ::= <string>        
        hasMany: indicates the field is a oneToMany relationship. 
            ::= "forward" | "backward" | "bidirectional"
        class: the type of class of this field.
            ::= <string>
        required: is this field required.
            ::= <boolean>    
        unique: is the value unique 
            ::= <boolean>
        default: default value of this field. ie. number:-1, string:"", array:[], reference:null, object:{}, boolean:false
            ::=  <boolean> | <digits> | <string> | "[]" | "null" | "{}" 
        final: is the field value final once created. 
            ::= <boolean>
        access: access level of this field, for 0 being lowest.
            ::= <integer>
        since: the version this field is introduced.
            ::= <integer>
        label: the UI display label for this field.
            ::= <string>
        rank: the displaying rank of this field.
            ::= <integer> 
        visible: is this field visible.
            ::= <boolean>

