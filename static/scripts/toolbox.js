var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Actions",
        "colour" : '%{BKY_ACTION_HUE}',
        "contents": [
          {
            kind: 'label',
            text: 'Actions'
          },
          {
            type : 'bot_login',
            kind : 'block',
            inputs: {
              TOKEN_INPUT: {
                shadow: {
                  type: 'token_input'
                }
              },
            }
          },
          {
            type : "get_by_id",
            kind : "block",
            inputs: {
              ID_INPUT : {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 69420,
                  },
                },
              },
            },
          },
          {
            type: 'change_guild_name',
            kind: 'block',
            inputs: {
              NAME: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: "Wumpus club"
                  }
                }
              }
            }
          },
          {
            type: 'message_action',
            kind: 'block',
            inputs: {
              CONTENT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: "Hi"
                  }
                }      
              }
            }
          },
          {
            type: 'channel_action',
            kind: 'block',
            inputs: {
              NAME: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: "Wumpus bathtub"
                  }
                }
              }
            }
          },
          {
            type: 'role_action',
            kind: 'block',
            inputs: {
              NAME: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: "Wumpus"
                  }
                }      
              },
              COLOUR: {
                shadow: {
                  type: 'colour_hsv_sliders'
                }      
              }
            }
          },
          {
            type: 'response_reply',
            kind: 'block',
            inputs : {
              CONTENT :{
                shadow : {
                  type: 'input',
                  fields : {
                    TEXT : "What's up?"
                  }
                }
              }
            }
          },
          {
            type: 'bulk_delete',
            kind: 'block',
            inputs : {
              AMOUNT :{
                shadow : {
                  type: 'math_number',
                  fields : {
                    NUM: 4
                  }
                }
              }
            }
          },
          {
            type: 'reaction_action',
            kind: 'block',
            inputs: {
              REACTION: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '👍'
                  }
                }
              }
            }
          },

          
        ]
      },
      {
        "kind": "category",
        "name": "Events",
        "colour" : '%{BKY_EVENT_HUE}',
        "contents": [
          {
            kind: 'label',
            text: 'Event Hats'
          },
          {
            type: 'once',
            kind: 'block',
          },
          {
            type: 'when',
            kind: 'block',
          },
          {
            kind: 'label',
            text: 'Event Bools'
          },
          {
            'type': 'botready',
            'kind': 'block',
          },
          {
            'type': 'bot_guild_event',
            'kind' : 'block'
          },
          {
            'type': 'channel_event',
            'kind': 'block',
          },
          {
            'type': 'message_event',
            'kind': 'block',
          },
          {
            'type': 'message_reaction_event',
            'kind': 'block',
          },
          {
            'type': 'guild_event',
            'kind': 'block',
          },
          {
            'type': 'guild_emoji_event',
            'kind': 'block',
          },
          {
            'type': 'guild_sticker_event',
            'kind': 'block',
          },
          {
            'type': 'guild_member_event',
            'kind': 'block',
          },
          {
            'type': 'guild_member_moderate_event',
            'kind': 'block',
          },
          {
            'type': 'guild_role_event',
            'kind': 'block',
          },
          {
            'type': 'guild_scheduled_event_event',
            'kind': 'block',
          },

        ]
      },
      {
        "kind": "category",
        "name": "Instances",
        "colour" : '%{BKY_INSTANCE_HUE}',
        "contents": [
          {
            kind: 'label',
            text: 'Instances'
          },
          {
            type: 'property_of',
            kind: 'block',
            disabled: true
          },
          {
            type: 'field_date',
            kind: 'block'
          },
          {
            type: 'embed_builder',
            kind: 'block',
            disabled: true,
            extraState :{
              "embedOptions" : ['DESCRIPTION'],
            },
          }
        ]
      },
      {
        'kind' : 'sep'
      },
      {
        kind: 'category',
        name: 'Logic',
        categorystyle: 'logic_category',
        contents: [
          {
            kind: 'label',
            text: 'Logic'
          },
          {
            type: 'controls_if',
            kind: 'block',
          },
          {
            type: 'logic_compare',
            kind: 'block',
            fields: {
              OP: 'EQ',
            },
            inputs: {
              A: {
                shadow: {
                  type: 'input',
                  fields : {
                    TEXT : ''
                  }       
                }
              },
              B: {
                shadow: {
                  type: 'input',
                  fields : {
                    TEXT : ''
                  }
                }
              }
            },
          },
          {
            type: 'logic_operation',
            kind: 'block',
            fields: {
              OP: 'AND',
            },
          },
          {
            type: 'logic_negate',
            kind: 'block',
          },
          {
            type: 'logic_boolean',
            kind: 'block',
            fields: {
              BOOL: 'TRUE',
            },
          },
          {
            type: 'logic_null',
            kind: 'block',
          },
          {
            type: 'logic_ternary',
            kind: 'block',
            inputs: {
              THEN: {
                shadow: {
                  type: 'input',
                  fields : {
                    TEXT : ''
                  }
                }
              },
              ELSE: {
                shadow: {
                  type: 'input',
                  fields : {
                    TEXT : ''
                  }
                }
              }
            }
          },
        ],
      },
      {
        kind: 'category',
        name: 'Loops',
        categorystyle: 'loop_category',
        contents: [
          {
            kind: 'label',
            text: 'Loops'
          },
          {
            type: 'controls_repeat_ext',
            kind: 'block',
            inputs: {
              TIMES: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 10,
                  },
                },
              },
            },
          },
          {
            type: 'controls_whileUntil',
            kind: 'block',
            fields: {
              MODE: 'WHILE',
            },
          },
          {
            type: 'controls_for',
            kind: 'block',
            fields: {
              VAR: {
                name: 'i',
              },
            },
          },
          {
            type: 'controls_forEach',
            kind: 'block',
            fields: {
              VAR: {
                name: 'j',
              },
            },
          },
          {
            type: 'controls_flow_statements',
            kind: 'block',
            fields: {
              FLOW: 'BREAK',
            },
          },
        ],
      },
      {
        kind: 'category',
        name: 'Math',
        categorystyle: 'math_category',
        contents: [
          {
            kind: 'label',
            text: 'Math'
          },
          {
            type: 'math_arithmetic',
            kind: 'block',
            fields: {
              OP: 'ADD',
            },
            inputs: {
              A: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 1,
                  },
                },
              },
              B: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 1,
                  },
                },
              },
            },
          },
          {
            type: 'math_single',
            kind: 'block',
            fields: {
              OP: 'ROOT',
            },
            inputs: {
              NUM: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 9,
                  },
                },
              },
            },
          },
          {
            type: 'math_trig',
            kind: 'block',
            fields: {
              OP: 'SIN',
            },
            inputs: {
              NUM: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 45,
                  },
                },
              },
            },
          },
          {
            type: 'math_constant',
            kind: 'block',
            fields: {
              CONSTANT: 'PI',
            },
          },
          {
            type: 'math_number_property',
            kind: 'block',
            fields: {
              PROPERTY: 'EVEN',
            },
            inputs: {
              NUMBER_TO_CHECK: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 0,
                  },
                },
              },
            },
          },
          {
            type: 'math_round',
            kind: 'block',
            fields: {
              OP: 'ROUND',
            },
            inputs: {
              NUM: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 3.1,
                  },
                },
              },
            },
          },
          {
            type: 'math_on_list',
            kind: 'block',
            fields: {
              OP: 'SUM',
            },
          },
          {
            type: 'math_modulo',
            kind: 'block',
            inputs: {
              DIVIDEND: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 64,
                  },
                },
              },
              DIVISOR: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 10,
                  },
                },
              },
            },
          },
          {
            type: 'math_constrain',
            kind: 'block',
            inputs: {
              VALUE: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 50,
                  },
                },
              },
              LOW: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 1,
                  },
                },
              },
              HIGH: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 100,
                  },
                },
              },
            },
          },
          {
            type: 'math_random_int',
            kind: 'block',
            inputs: {
              FROM: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 1,
                  },
                },
              },
              TO: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 100,
                  },
                },
              },
            },
          },
          {
            type: 'math_random_float',
            kind: 'block',
          },
          {
            type: 'math_atan2',
            kind: 'block',
            inputs: {
              X: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 1,
                  },
                },
              },
              Y: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 1,
                  },
                },
              },
            },
          },
        ],
      },
      {
        kind: 'category',
        name: 'Text',
        categorystyle: 'text_category',
        contents: [
          {
            kind: 'label',
            text: 'Text'
          },
          {
            type: 'terminal_log',
            kind: 'block',
            inputs: {
              LOG: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: 'abc',
                  },
                },
              },
            },
          },
          {
            type: 'text_join',
            kind: 'block',
            inputs :{
              ADD0 :{
                type: 'input'
              },
              ADD1 : {
                type: 'input'
              }
            }
          },
          {
            type: 'text_append',
            kind: 'block',
            fields: {
              name: 'item',
            },
            inputs: {
              TEXT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
            },
          },
          {
            type: 'text_length',
            kind: 'block',
            inputs: {
              VALUE: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: 'abc',
                  },
                },
              },
            },
          },
          {
            type: 'text_isEmpty',
            kind: 'block',
            inputs: {
              VALUE: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
            },
          },
          {
            type: 'text_indexOf',
            kind: 'block',
            fields: {
              END: 'FIRST',
            },
            inputs: {
              VALUE: {
                block: {
                  type: 'variables_get',
                  fields: {
                    VAR: {
                      name: 'text',
                    },
                  },
                },
              },
              FIND: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: 'abc',
                  },
                },
              },
            },
          },
          {
            type: 'text_charAt',
            kind: 'block',
            fields: {
              WHERE: 'FROM_START',
            },
            inputs: {
              VALUE: {
                block: {
                  type: 'variables_get',
                  fields: {
                    VAR: {
                      name: 'text',
                    },
                  },
                },
              },
            },
          },
          {
            type: 'text_getSubstring',
            kind: 'block',
            fields: {
              WHERE1: 'FROM_START',
              WHERE2: 'FROM_START',
            },
            inputs: {
              STRING: {
                block: {
                  type: 'variables_get',
                  fields: {
                    VAR: {
                      name: 'text',
                    },
                  },
                },
              },
            },
          },
          {
            type: 'text_changeCase',
            kind: 'block',
            fields: {
              CASE: 'UPPERCASE',
            },
            inputs: {
              TEXT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: 'abc',
                  },
                },
              },
            },
          },
          {
            type: 'text_trim',
            kind: 'block',
            fields: {
              MODE: 'BOTH',
            },
            inputs: {
              TEXT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: 'abc',
                  },
                },
              },
            },
          },
          {
            type: 'text_count',
            kind: 'block',
            inputs: {
              SUB: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
              TEXT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
            },
          },
          {
            type: 'text_replace',
            kind: 'block',
            inputs: {
              FROM: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
              TO: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
              TEXT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
            },
          },
          {
            type: 'text_reverse',
            kind: 'block',
            inputs: {
              TEXT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: '',
                  },
                },
              },
            },
          },
          {
            type: 'text_prompt_ext',
            kind: 'block',
            fields: {
              type: 'input',
            },
            inputs: {
              TEXT: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: 'abc',
                  },
                },
              },
            },
          },
        ],
      },
      {
        kind: 'category',
        name: 'Lists',
        categorystyle: 'list_category',
        contents: [
          {
            kind: 'label',
            text: 'Lists'
          },
          {
            type: 'lists_create_with',
            kind: 'block',
          },
          {
            type: 'lists_repeat',
            kind: 'block',
            inputs: {
              ITEM: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: ''
                  }
                }
              },
              NUM: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 5,
                  },
                },
              },
            },
          },
          {
            type: 'lists_length',
            kind: 'block',
          },
          {
            type: 'lists_isEmpty',
            kind: 'block',
          },
          {
            type: 'lists_indexOf',
            kind: 'block',
  
            fields: {
              END: 'FIRST',
            },
            inputs: {
              VALUE: {
                block: {
                  type: 'variables_get',
                  fields: {
                    VAR: {
                      name: 'list',
                    },
                  },
                },
              },
            },
          },
          {
            type: 'lists_getIndex',
            kind: 'block',
            fields: {
              MODE: 'GET',
              WHERE: 'FROM_START',
            },
            inputs: {
              VALUE: {
                block: {
                  type: 'variables_get',
                  fields: {
                    VAR: {
                      name: 'list',
                    },
                  },
                },
              },
            },
          },
          {
            type: 'lists_setIndex',
            kind: 'block',
            fields: {
              MODE: 'SET',
              WHERE: 'FROM_START',
            },
            inputs: {
              LIST: {
                block: {
                  type: 'variables_get',
                  fields: {
                    VAR: {
                      name: 'list',
                    },
                  },
                },
              },
            },
          },
          {
            type: 'lists_getSublist',
            kind: 'block',
            fields: {
              WHERE1: 'FROM_START',
              WHERE2: 'FROM_START',
            },
            inputs: {
              LIST: {
                block: {
                  type: 'variables_get',
                  fields: {
                    VAR: {
                      name: 'list',
                    },
                  },
                },
              },
            },
          },
          {
            type: 'lists_split',
            kind: 'block',
  
            fields: {
              MODE: 'SPLIT',
            },
            inputs: {
              DELIM: {
                shadow: {
                  type: 'input',
                  fields: {
                    TEXT: ',',
                  },
                },
              },
            },
          },
          {
            type: 'lists_sort',
            kind: 'block',
  
            fields: {
              TYPE: 'NUMERIC',
              DIRECTION: '1',
            },
          },
          {
            type: 'lists_reverse',
            kind: 'block',
          },
        ],
      },
      {
        kind: 'category',
        categorystyle: 'colour_category',
        name: 'Colour',
        contents: [
          {
            kind: 'label',
            text: 'Colour'
          },
          {
            type: 'colour_hsv_sliders',
            kind: 'block'
          },
          {
            type: 'colour_random',
            kind: 'block',
          },
          {
            type: 'colour_rgb',
            kind: 'block',
            inputs: {
              RED: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 100,
                  },
                },
              },
              GREEN: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 50,
                  },
                },
              },
              BLUE: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 0,
                  },
                },
              },
            },
          },
          {
            type: 'colour_blend',
            kind: 'block',
            inputs: {
              COLOUR1: {
                shadow: {
                  type: 'colour_hsv_sliders',
                  fields: {
                    COLOUR: '#ff0000',
                  },
                },
              },
              COLOUR2: {
                shadow: {
                  type: 'colour_hsv_sliders',
                  fields: {
                    COLOUR: '#3333ff',
                  },
                },
              },
              RATIO: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 0.5,
                  },
                },
              },
            },
          },
        ],
      },
      {
        kind: 'sep',
      },
      {
        kind: 'category',
        name: 'Variables',
        custom: 'VARIABLE',
        categorystyle: 'variable_category',
      },
      {
        kind: 'category',
        name: 'Functions',
        custom: 'PROCEDURE',
        categorystyle: 'procedure_category',
      },
      {
        kind: 'search',
        name: 'Search',
        contents : [],
      }
    ]
};