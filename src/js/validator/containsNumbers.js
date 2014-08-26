/* Validator: containsNumbers()
 * Author: Joshua Cornutt <jcornutt@gmail.com>
 * Description:
 *    This checks that a input string contains a certain amount of numbers
 * Inputs:
 *    min: Minimum numbers required for validation
 *    max: Maximum numbers allowed for validation
 *    message: Custom error message
 * Notes:
 *    At least one of the min/max options must be defined.
 */
(function($) {
    $.fn.bootstrapValidator.i18n.containsNumbers = $.extend($.fn.bootstrapValidator.i18n.containsNumbers || {}, {
        'default': 'Please enter the required amount of numbers',
        message_less: 'This field must contain less than %s numbers',
        message_more: 'This field must contain more than %s numbers',
        message_between: 'This field must contain between %s and %s numbers'
    });

    $.fn.bootstrapValidator.validators.containsNumbers = {
        html5Attributes: {
            message: 'message',
            min: 'min',
            max: 'max'
        },

        validate: function(validator, $field, options) {
            var value = $field.val();
            var min = $.isNumeric(options.min) ? options.min : validator.getDynamicOption($field, options.min);
            var max = $.isNumeric(options.max) ? options.max : validator.getDynamicOption($field, options.max);
            var message = options.message || $.fn.bootstrapValidator.i18n.containsNumbers['default'];
            var isValid = false;
           
            // Blank value?  I guess that makes it "valid"...
            if ( value === '' )
                return true;
           
            // Minimum required numbers more than the length of the input?  Denied!
            if ( parseInt(min) > value.length )
                return false;

            // Count the number of numbers in the string
            var nNumbers = value.replace(/[^0-9]/g,"").length;

            if ( !!min && !!max ) { // Both min and max are defined
                message = $.fn.bootstrapValidator.helpers.format(
                    options.message ||
                    $.fn.bootstrapValidator.i18n.containsNumbers.message_between,
                    [parseInt(min, 10), parseInt(max, 10)]);
                isValid = ((nNumbers >= min) && (nNumbers <= max));
            } else if ( !!max ) { // Only max is defined
                message = $.fn.bootstrapValidator.helpers.format(
                    options.message ||
                    $.fn.bootstrapValidator.i18n.containsNumbers.message_less,
                    [parseInt(max, 10)]);
                isValid = (nNumbers <= max);
            } else if ( !!min ) { // Only min is defined
                message = $.fn.bootstrapValidator.helpers.format(
                    options.message ||
                    $.fn.bootstrapValidator.i18n.containsNumbers.message_more,
                    [parseInt(min, 10)]);
                isValid = (nNumbers >= min);
            } else return false; // Neither are defined... Denied!
           
            return { valid: isValid, message: message }
        }
    };
}(window.jQuery));
